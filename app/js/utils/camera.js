/**
 * Camera management for QR scanning using ZXing
 * Handles camera lifecycle and prevents memory leaks
 */

let codeReader = null;
let videoElement = null;
let currentStream = null;

/**
 * Stop all camera streams and cleanup
 */
window.stopCamera = function stopCamera() {
    console.log('🛑 Stopping camera...');
    
    // Stop ZXing reader
    if (codeReader) {
        try {
            codeReader.reset();
        } catch (err) {
            console.warn('Reset error:', err);
        }
    }
    
    // Stop media stream
    if (currentStream) {
        currentStream.getTracks().forEach(track => {
            track.stop();
            console.log('📷 Track stopped');
        });
        currentStream = null;
    }
    
    // Clear video element
    if (videoElement && videoElement.srcObject) {
        videoElement.srcObject.getTracks().forEach(track => track.stop());
        videoElement.srcObject = null;
    }
    
    // Clear all video elements
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
            video.srcObject = null;
        }
    });
}

/**
 * Initialize QR code scanner with camera using ZXing
 */
async function initScanner() {
    console.log('📷 Initializing camera scanner...');
    
    // Check if ZXing is available
    if (typeof ZXing === 'undefined') {
        console.error('❌ ZXing library not loaded');
        showCameraError('Thư viện quét QR chưa được tải. Vui lòng tải lại trang.');
        return;
    }
    
    const readerElement = document.getElementById("reader");
    if (!readerElement) {
        console.error('❌ Reader element not found');
        return;
    }
    
    // Create video element
    videoElement = document.createElement('video');
    videoElement.setAttribute('autoplay', '');
    videoElement.setAttribute('playsinline', '');
    videoElement.style.width = '100%';
    videoElement.style.maxWidth = '400px';
    videoElement.style.borderRadius = '12px';
    
    readerElement.innerHTML = '';
    readerElement.appendChild(videoElement);
    
    // Create ZXing code reader
    codeReader = new ZXing.BrowserMultiFormatReader();
    
    try {
        // Get video devices
        const videoInputDevices = await codeReader.listVideoInputDevices();
        console.log('📷 Found cameras:', videoInputDevices.length);
        
        if (videoInputDevices.length === 0) {
            throw new Error('No camera found');
        }
        
        // Use back camera if available (last device is usually back camera on mobile)
        const selectedDeviceId = videoInputDevices.length > 1 
            ? videoInputDevices[videoInputDevices.length - 1].deviceId 
            : videoInputDevices[0].deviceId;
        
        console.log('📷 Using camera:', selectedDeviceId);
        
        // Start decoding
        const controls = await codeReader.decodeFromVideoDevice(
            selectedDeviceId,
            videoElement,
            (result, error) => {
                if (result) {
                    console.log('✅ QR Code scanned:', result.getText());
                    onScanSuccess(result.getText());
                }
                // Ignore errors (they happen continuously while scanning)
            }
        );
        
        // Store stream for cleanup
        if (videoElement.srcObject) {
            currentStream = videoElement.srcObject;
        }
        
        console.log('📷 Camera started successfully');
        
    } catch (err) {
        console.error('📷 Camera error:', err);
        let errorMessage = 'Không thể truy cập camera.';
        
        if (err.name === 'NotAllowedError') {
            errorMessage = 'Quyền camera bị từ chối. Vui lòng cho phép quyền camera trong cài đặt trình duyệt.';
        } else if (err.name === 'NotFoundError') {
            errorMessage = 'Không tìm thấy camera. Vui lòng kiểm tra thiết bị.';
        } else if (err.name === 'NotReadableError') {
            errorMessage = 'Camera đang được sử dụng bởi ứng dụng khác. Vui lòng đóng ứng dụng đó và thử lại.';
        }
        
        showCameraError(errorMessage);
    }
}

/**
 * Show camera error message
 */
function showCameraError(message) {
    const readerElement = document.getElementById("reader");
    if (readerElement) {
        readerElement.innerHTML = `
            <div class="p-8 text-center text-white">
                <div class="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-red-400">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" x2="12" y1="8" y2="12"></line>
                        <line x1="12" x2="12.01" y1="16" y2="16"></line>
                    </svg>
                </div>
                <p class="mb-2 font-semibold">${message}</p>
                <p class="text-sm text-white/70 mt-4">Bạn vẫn có thể chọn ảnh QR từ thư viện bên dưới</p>
            </div>
        `;
    }
}

/**
 * Handle file upload from gallery
 */
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    console.log('📁 File selected:', file.name);
    
    // Stop camera before processing file
    stopCamera();
    
    // Process image file
    processImageFile(file);
}

/**
 * Process image file for QR code using ZXing
 */
async function processImageFile(file) {
    try {
        if (!codeReader) {
            codeReader = new ZXing.BrowserMultiFormatReader();
        }
        
        // Create image element from file
        const imageUrl = URL.createObjectURL(file);
        const img = new Image();
        
        img.onload = async () => {
            try {
                const result = await codeReader.decodeFromImageElement(img);
                console.log('✅ QR Code from image:', result.getText());
                URL.revokeObjectURL(imageUrl);
                onScanSuccess(result.getText());
            } catch (err) {
                console.error('🔍 Decode error:', err);
                URL.revokeObjectURL(imageUrl);
                alert('Không tìm thấy mã QR trong ảnh. Vui lòng thử ảnh khác.');
                // Restart camera
                setTimeout(() => {
                    initScanner();
                }, 500);
            }
        };
        
        img.onerror = () => {
            URL.revokeObjectURL(imageUrl);
            alert('Không thể đọc ảnh. Vui lòng thử lại.');
        };
        
        img.src = imageUrl;
        
    } catch (err) {
        console.error('📁 File processing error:', err);
        alert('Có lỗi xảy ra khi xử lý ảnh. Vui lòng thử lại.');
    }
}

/**
 * Called when QR code is successfully scanned
 */
function onScanSuccess(decodedText) {
    console.log('✅ Scanned QR code');
    
    // Stop scanner
    stopCamera();
    
    // Save scanned data and navigate to view page
    sessionStorage.setItem('scannedData', decodedText);
    navigate('view');
}