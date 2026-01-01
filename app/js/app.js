/**
 * App initialization and global utilities
 */

console.log('📮 Thư Niêm Phong - Loaded');

// Global camera stop function (fallback)
// This ensures stopCamera is available even before camera.js loads
if (typeof stopCamera === 'undefined') {
    window.stopCamera = function() {
        console.log('🛑 stopCamera called (fallback)');
        // Stop all video tracks
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (video.srcObject) {
                video.srcObject.getTracks().forEach(track => {
                    track.stop();
                    console.log('📷 Video track stopped');
                });
                video.srcObject = null;
            }
        });
    };
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Utility: Format date in Vietnamese
function formatVietnameseDate(date) {
    return date.toLocaleDateString('vi-VN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}