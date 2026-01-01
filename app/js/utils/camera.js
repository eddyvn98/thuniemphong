/**
 * Camera management for QR scanning
 * Handles camera lifecycle and prevents memory leaks
 */

let html5QrCode = null;
let cameraStream = null;

/**
 * Stop all camera streams and cleanup
 */
function stopCamera() {
    // Stop html5-qrcode scanner
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            console.log('📷 Camera stopped');
        }).catch(err => {
            console.error('❌ Error stopping camera:', err);
        });
    }
    
    // Stop any remaining media streams
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
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
 * Initialize QR code scanner with camera
 */
function initScanner() {
    // Check if Html5Qrcode is available
    if (typeof Html5Qrcode === 'undefined') {
        console.error('❌ Html5Qrcode library not loaded');
        alert('Thư viện quét QR chưa được tải. Vui lòng tải lại trang.');
        return;
    }
    
    const readerElement = document.getElementById("reader");
    if (!readerElement) {
        console.error('❌ Reader element not found');
        return;
    }
    
    html5QrCode = new Html5Qrcode("reader");
    
    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        disableFlip: false,
        rememberLastUsedCamera: true
    };
    
    // Request camera with back camera preference
    const cameraConfig = { facingMode: { ideal: "environment" } };
    
    html5QrCode.start(
        cameraConfig,
        config,
        onScanSuccess,
        onScanError
    ).catch(err => {
        console.error('📷 Camera start error:', err);
        
        // Try to get available cameras and use the first one
        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length > 0) {
                console.log('📷 Found cameras:', devices.length);
                // Use the last camera (usually back camera on mobile)
                const cameraId = devices[devices.length - 1].id;
                html5QrCode.start(
                    cameraId,
                    config,
                    onScanSuccess,
                    onScanError
                ).catch(err2 => {
                    console.error('📷 Camera start error (fallback):', err2);
                    showCameraError();
                });
            } else {
                showCameraError();
            }
        }).catch(err2 => {
            console.error('📷 Get cameras error:', err2);
            showCameraError();
        });
    });
}

/**
 * Show camera error message
 */
function showCameraError() {
    const readerElement = document.getElementById("reader");
    if (readerElement) {
        readerElement.innerHTML = `
            <div class="p-8 text-center text-white">
                <p class="mb-4">Không thể truy cập camera</p>
                <p class="text-sm text-white/70">Vui lòng cho phép quyền camera hoặc chọn ảnh từ thư viện bên dưới</p>
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
    
    // CRITICAL: Stop camera before processing file
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            processImageFile(file);
        }).catch(err => {
            console.error('Error stopping camera:', err);
            processImageFile(file);
        });
    } else {
        processImageFile(file);
    }
}

/**
 * Process image file for QR code
 */
function processImageFile(file) {
    html5QrCode.scanFile(file, true)
        .then(decodedText => {
            onScanSuccess(decodedText);
        })
        .catch(err => {
            console.error('🔍 Scan error:', err);
            alert('Không tìm thấy mã QR trong ảnh. Vui lòng thử ảnh khác.');
            // Restart camera
            setTimeout(() => {
                initScanner();
            }, 500);
        });
}

/**
 * Called when QR code is successfully scanned
 */
function onScanSuccess(decodedText) {
    console.log('✅ Scanned QR code');
    
    // Stop scanner
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => console.error('Error stopping:', err));
    }
    
    // Save scanned data and navigate to view page
    sessionStorage.setItem('scannedData', decodedText);
    navigate('view');
}

/**
 * Called on scan error (ignore - happens continuously while scanning)
 */
function onScanError(error) {
    // Ignore continuous scan errors
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    stopCamera();
});