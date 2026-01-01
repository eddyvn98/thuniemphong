/**
 * QR Code generation utilities
 */

/**
 * Generate QR code from sealed data
 * @param {string} data - Serialized SealedQR data
 * @param {HTMLElement} container - DOM element to render QR in
 */
function generateQRCode(data, container) {
    // Clear previous QR code
    container.innerHTML = '';
    
    // Generate new QR code
    // CRITICAL: Dùng Level L để tăng capacity (data mã hóa thường lớn)
    new QRCode(container, {
        text: data,
        width: 256,
        height: 256,
        colorDark: "#1e3a8a",  // Navy blue - giống design cũ
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L  // Low = max capacity
    });
}

/**
 * Download QR code as PNG image
 */
function downloadQR() {
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `thu-niem-phong-${Date.now()}.png`;
        link.href = url;
        link.click();
    }
}