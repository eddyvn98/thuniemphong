/**
 * Editor Page - Màn viết thư (Step 1)
 * User nhập nội dung cần mã hóa
 */

function renderEditor() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div class="flex-grow flex flex-col bg-white">
            <!-- Header -->
            <header class="p-4 flex items-center justify-between border-b border-slate-100 sticky top-0 bg-white z-10">
                <button onclick="navigate('')" class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                    </svg>
                </button>
                <h1 class="font-bold text-lg">Viết thư</h1>
                <button onclick="goToSetup()" class="text-blue-600 font-semibold px-3">Tiếp tục</button>
            </header>
            
            <!-- Content -->
            <div class="flex-grow overflow-y-auto p-6 space-y-6">
                
                <!-- Security Notice -->
                <div class="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 flex-shrink-0 mt-0.5">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <p class="text-sm text-blue-700">Tin nhắn được mã hóa trên máy. Không lưu đám mây.</p>
                </div>
                
                <!-- Link Toggle -->
                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                        <span class="text-sm font-medium text-slate-700">Đây là link (video / trang web)</span>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="is-link-toggle" onchange="toggleLinkMode()" class="sr-only peer">
                        <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                
                <!-- Message Input -->
                <div class="space-y-2">
                    <textarea 
                        id="message-input" 
                        rows="12" 
                        maxlength="2000"
                        oninput="updateCharCount()"
                        class="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none resize-none text-slate-800"
                        placeholder="Viết điều bạn muốn người khác chỉ đọc trong tương lai..."
                    ></textarea>
                    <div class="text-right text-sm text-slate-400">
                        <span id="char-count">0</span> / 2000 ký tự
                    </div>
                </div>
                
            </div>
        </div>
    `;
    
    // Restore data nếu có
    if (editorData.message) {
        document.getElementById('message-input').value = editorData.message;
        updateCharCount();
    }
    if (editorData.isLink) {
        document.getElementById('is-link-toggle').checked = true;
    }
}

function updateCharCount() {
    const input = document.getElementById('message-input');
    const count = document.getElementById('char-count');
    count.textContent = input.value.length;
}

function toggleLinkMode() {
    editorData.isLink = document.getElementById('is-link-toggle').checked;
}

function goToSetup() {
    const message = document.getElementById('message-input').value.trim();
    
    if (!message) {
        alert('Vui lòng nhập nội dung!');
        return;
    }
    
    // Save data
    editorData.message = message;
    
    // Next step: Setup
    navigate('setup');
}
