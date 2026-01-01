/**
 * App initialization and global utilities
 */

console.log('📮 Thư Niêm Phong - Loaded');

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