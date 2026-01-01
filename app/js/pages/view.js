/**
 * View Letter Page
 * Displays decrypted message or prompts for password
 */

function renderView() {
    const scannedData = sessionStorage.getItem('scannedData');
    
    if (!scannedData) {
        navigate('scan');
        return;
    }
    
    const container = document.getElementById('app-container');
    
    try {
        // Deserialize and validate
        const sealed = deserializeSealedQR(scannedData);
        
        // Check if we need password
        // We always need to prompt for password (even if empty)
        renderPasswordPrompt(sealed);
        
    } catch (error) {
        console.error('❌ Invalid QR code:', error);
        renderInvalidQR();
    }
}

/**
 * Render password input prompt
 */
function renderPasswordPrompt(sealed) {
    const container = document.getElementById('app-container');
    const unlockDate = new Date(sealed.unlockDate);
    
    container.innerHTML = `
        <div class="flex-grow flex items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
            <div class="w-full max-w-md space-y-6">
                <div class="text-center space-y-2">
                    <div class="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-slate-900">Thư Niêm Phong</h2>
                    <p class="text-slate-500">Ngày mở: ${formatVietnameseDate(unlockDate)}</p>
                </div>
                
                <div class="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-lg space-y-4">
                    <input 
                        type="password" 
                        id="decrypt-password" 
                        class="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none"
                        placeholder="Nhập mật khẩu (hoặc để trống)"
                        onkeypress="if(event.key==='Enter') attemptUnseal();"
                    />
                    <button onclick="attemptUnseal()" class="btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                        </svg>
                        <span>Mở thư</span>
                    </button>
                </div>
                
                <button onclick="navigate('')" class="btn-secondary">
                    <span>Hủy</span>
                </button>
            </div>
        </div>
    `;
}

/**
 * Attempt to unseal the message
 */
async function attemptUnseal() {
    const password = document.getElementById('decrypt-password').value;
    const scannedData = sessionStorage.getItem('scannedData');
    
    try {
        const sealed = deserializeSealedQR(scannedData);
        const currentTime = new Date();
        
        console.log('🔓 Attempting to unseal message...');
        
        // CRITICAL: unsealMessage will check time lock first
        const message = await unsealMessage(
            sealed,
            password || undefined,
            currentTime
        );
        
        console.log('✅ Message unsealed successfully');
        
        // Show decrypted message
        renderDecryptedMessage(message, sealed);
        
    } catch (error) {
        console.error('❌ Unseal error:', error);
        
        if (error.code === 'NOT_YET_OPENABLE') {
            renderTimeLocked(error.unlockDate, error.daysRemaining);
        } else if (error.code === 'WRONG_PASSWORD') {
            alert('Mật khẩu không đúng!');
        } else {
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    }
}

/**
 * Render time-locked message
 */
function renderTimeLocked(unlockDate, daysRemaining) {
    const container = document.getElementById('app-container');
    
    container.innerHTML = `
        <div class="flex-grow flex items-center justify-center p-6 bg-gradient-to-b from-orange-50 to-white">
            <div class="w-full max-w-md space-y-6 text-center">
                <div class="w-24 h-24 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-600">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>
                
                <div class="space-y-2">
                    <h2 class="text-3xl font-bold text-slate-900">Chưa đến lúc</h2>
                    <p class="text-lg text-slate-600">Thư này chỉ có thể mở vào</p>
                    <p class="text-2xl font-bold text-orange-600">${formatVietnameseDate(unlockDate)}</p>
                </div>
                
                <div class="p-6 bg-white rounded-3xl border-2 border-orange-100 shadow-lg">
                    <p class="text-4xl font-black text-orange-600">${daysRemaining}</p>
                    <p class="text-sm text-slate-500 mt-2">ngày nữa</p>
                </div>
                
                <div class="p-4 bg-orange-50 border-2 border-orange-100 rounded-xl">
                    <p class="text-sm text-orange-700">
                        ⏰ Hãy kiên nhẫn. Điều tốt đẹp đáng chờ đợi.
                    </p>
                </div>
                
                <button onclick="navigate('')" class="btn-primary bg-orange-600 hover:bg-orange-700" style="background-color: #ea580c;">
                    <span>Về trang chủ</span>
                </button>
            </div>
        </div>
    `;
}

/**
 * Render successfully decrypted message
 */
function renderDecryptedMessage(message, sealed) {
    const container = document.getElementById('app-container');
    const unlockDate = new Date(sealed.unlockDate);
    
    container.innerHTML = `
        <div class="flex-grow overflow-y-auto p-6 bg-gradient-to-b from-green-50 to-white">
            <div class="max-w-2xl mx-auto space-y-6">
                <div class="text-center space-y-2">
                    <div class="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-slate-900">Thư đã mở!</h2>
                    <p class="text-sm text-slate-400">Có thể mở từ ${formatVietnameseDate(unlockDate)}</p>
                </div>
                
                <div class="p-8 bg-white rounded-3xl border-2 border-green-100 shadow-xl">
                    <div class="prose prose-slate max-w-none">
                        <p class="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">${escapeHtml(message)}</p>
                    </div>
                </div>
                
                <div class="p-4 bg-green-50 border-2 border-green-100 rounded-xl text-center">
                    <p class="text-sm text-green-700">
                        💚 Lời nhắn này đến từ quá khứ
                    </p>
                </div>
                
                <button onclick="navigate('')" class="btn-primary bg-green-600 hover:bg-green-700" style="background-color: #16a34a;">
                    <span>Về trang chủ</span>
                </button>
            </div>
        </div>
    `;
}

/**
 * Render invalid QR code error
 */
function renderInvalidQR() {
    const container = document.getElementById('app-container');
    
    container.innerHTML = `
        <div class="flex-grow flex items-center justify-center p-6">
            <div class="text-center space-y-6 max-w-md">
                <div class="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" x2="9" y1="9" y2="15"></line>
                        <line x1="9" x2="15" y1="9" y2="15"></line>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-slate-900">Mã QR không hợp lệ</h2>
                <p class="text-slate-500">Đây không phải mã QR từ Thư Niêm Phong</p>
                <button onclick="navigate('scan')" class="btn-primary">
                    <span>Quét lại</span>
                </button>
            </div>
        </div>
    `;
}