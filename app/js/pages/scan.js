/**
 * Scan QR Code Page
 * Allows users to scan QR codes via camera or file upload
 */

function renderScan() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div class="min-h-screen bg-black flex flex-col">
            <!-- Header -->
            <header class="p-4 text-white flex justify-between z-10 w-full bg-black">
                <button onclick="navigate('')" class="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                    </svg>
                </button>
                <span class="font-medium">Đang quét...</span>
                <div class="w-6"></div>
            </header>
            
            <!-- Scanner Area -->
            <div class="flex-1 flex items-center justify-center overflow-hidden w-full relative p-6">
                <div class="w-full max-w-sm">
                    <div id="reader" class="rounded-xl overflow-hidden"></div>
                </div>
            </div>
            
            <!-- Upload Button -->
            <div class="p-8 flex justify-center pb-12 w-full bg-black">
                <input type="file" accept="image/*" hidden id="qr-file" onchange="handleFileSelect(event)"/>
                <label for="qr-file" class="flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors cursor-pointer group">
                    <div class="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/30 group-hover:bg-white/20 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                            <circle cx="9" cy="9" r="2"></circle>
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                        </svg>
                    </div>
                    <span class="text-xs font-medium tracking-wide">Chọn từ thư viện</span>
                </label>
            </div>
        </div>
    `;
    
    // Initialize scanner after DOM is ready
    setTimeout(() => {
        initScanner();
    }, 100);
}