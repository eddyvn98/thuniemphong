/**
 * Hash-based router for SPA navigation
 * Uses hash routing for file:// protocol compatibility
 */

const routes = {
    '': 'renderHome',
    'onboarding': 'renderOnboarding',
    'editor': 'renderEditor',
    'setup': 'renderSetup',
    'countdown': 'renderCountdown',
    'success': 'renderSuccess',
    'scan': 'renderScan',
    'view': 'renderView'
};

/**
 * Navigate to a route
 * @param {string} path - Route path (without #)
 */
function navigate(path) {
    // Update hash (camera will be stopped by router)
    window.location.hash = path;
}

/**
 * Router function - renders the current route
 */
function router() {
    // Stop camera before route change
    stopCamera();
    
    // Get hash without #
    const hash = window.location.hash.slice(1);
    
    // Get render function name
    const functionName = routes[hash] || routes[''];
    
    // Call render function
    if (window[functionName]) {
        window[functionName]();
    } else {
        console.error('Route not found:', hash);
        renderHome();
    }
}

// Listen for hash changes
window.addEventListener('hashchange', router);

// Initial render on page load
window.addEventListener('DOMContentLoaded', router);

// Stop camera when page visibility changes (user switches tabs)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopCamera();
    }
});

// Stop camera when user navigates away or closes tab
window.addEventListener('pagehide', () => {
    stopCamera();
});

// Backup cleanup on beforeunload
window.addEventListener('beforeunload', () => {
    stopCamera();
});