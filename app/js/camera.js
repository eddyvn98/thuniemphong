// Camera management
let html5QrCode = null;
let cameraStream = null;

// Stop camera helper
function stopCamera() {
    // Stop html5-qrcode scanner
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            console.log('Camera stopped');
        }).catch(err => {
            console.error('Error stopping camera:', err);
        });
    }
    
    // Stop any remaining media streams
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    
    // Clear video elements
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
            video.srcObject = null;
        }
    });
}

// Initialize QR Scanner
function initScanner() {
    html5QrCode = new Html5Qrcode("reader");
    
    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
    };
    
    html5QrCode.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanError
    ).catch(err => {
        console.error('Camera error:', err);
        alert('Không thể truy cập camera. Vui lòng cho phép quyền camera hoặc chọn ảnh từ thư viện.');
    });
}

// Handle file upload
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Stop camera before processing file
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

// Process image file for QR code
function processImageFile(file) {
    html5QrCode.scanFile(file, true)
        .then(decodedText => {
            onScanSuccess(decodedText);
        })
        .catch(err => {
            console.error('Scan error:', err);
            alert('Không tìm thấy mã QR trong ảnh. Vui lòng thử ảnh khác.');
            // Restart camera
            setTimeout(() => {
                initScanner();
            }, 500);
        });
}

// On scan success
function onScanSuccess(decodedText) {
    console.log('Scanned:', decodedText);
    
    // Stop scanner
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => console.error('Error stopping:', err));
    }
    
    // Save scanned data and navigate to view page
    sessionStorage.setItem('scannedData', decodedText);
    navigate('/view');
}

// On scan error (ignore)
function onScanError(error) {
    // Ignore continuous scan errors
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    stopCamera();
});