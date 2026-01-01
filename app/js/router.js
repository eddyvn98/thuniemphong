/**
 * Hash-based router for SPA navigation
 * Uses hash routing for file:// protocol compatibility
 */

const routes = {
    '': 'renderHome',
    'create': 'renderCreate',
    'scan': 'renderScan',
    'view': 'renderView'
};

/**
 * Navigate to a route
 * @param {string} path - Route path (without #)
 */
function navigate(path) {
    // Stop camera if active
    stopCamera();
    
    // Update hash
    window.location.hash = path;
}

/**
 * Router function - renders the current route
 */
function router() {
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