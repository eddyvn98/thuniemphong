/**
 * Create Letter Page
 * Allows users to create encrypted time-locked messages
 */

function renderCreate() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div class="flex-grow overflow-y-auto bg-white">
            <!-- Header -->
            <header class="p-4 flex items-center border-b border-slate-100 sticky top-0 bg-white z-10">
                <button onclick="navigate('')" class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                    </svg>
                </button>
                <h1 class="flex-1 text-center font-bold text-lg pr-10">Tạo Thư Niêm Phong</h1>
            </header>
            
            <!-- Form -->
            <div class="p-6 space-y-6 max-w-2xl mx-auto">
                <!-- Message Input -->
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-slate-700">Lời nhắn của bạn</label>
                    <textarea 
                        id="message" 
                        rows="6" 
                        class="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none resize-none"
                        placeholder="Viết điều bạn muốn gửi đến tương lai..."
                    ></textarea>
                </div>
                
                <!-- Date Input -->
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-slate-700">Ngày có thể mở</label>
                    <input 
                        type="date" 
                        id="unlock-date" 
                        class="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none"
                        min="${new Date().toISOString().split('T')[0]}"
                    />
                    <p class="text-xs text-slate-400">Thư chỉ có thể mở từ ngày này trở đi</p>
                </div>
                
                <!-- Password Input -->
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-slate-700">Mật khẩu (tùy chọn)</label>
                    <input 
                        type="password" 
                        id="password" 
                        class="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none"
                        placeholder="Để trống nếu không cần mật khẩu"
                    />
                    <p class="text-xs text-slate-400">⚠️ Không lưu mật khẩu - quên = mất vĩnh viễn</p>
                </div>
                
                <!-- Create Button -->
                <button onclick="createLetter()" class="btn-primary shadow-lg text-lg py-4 mt-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="5" height="5" x="3" y="3" rx="1"></rect>
                        <rect width="5" height="5" x="16" y="3" rx="1"></rect>
                        <rect width="5" height="5" x="3" y="16" rx="1"></rect>
                        <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path>
                        <path d="M21 21v.01"></path>
                        <path d="M12 7v3a2 2 0 0 1-2 2H7"></path>
                        <path d="M3 12h.01"></path>
                        <path d="M12 3h.01"></path>
                        <path d="M12 16v.01"></path>
                        <path d="M16 12h1"></path>
                        <path d="M21 12v.01"></path>
                        <path d="M12 21v-1"></path>
                    </svg>
                    <span>Tạo mã QR</span>
                </button>
            </div>
            
            <!-- QR Code Result (hidden initially) -->
            <div id="qr-result" class="hidden p-6 space-y-6 max-w-2xl mx-auto">
                <div class="p-8 bg-gradient-to-b from-blue-50 to-white rounded-3xl border-2 border-blue-100 space-y-6">
                    <div class="text-center space-y-2">
                        <div class="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
                                <path d="M20 6 9 17l-5-5"></path>
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold text-slate-900">Thư đã được niêm phong!</h2>
                        <p class="text-slate-500">Lưu mã QR này để mở khi đến ngày</p>
                    </div>
                    
                    <!-- QR Code Display -->
                    <div class="bg-white p-6 rounded-2xl flex justify-center" id="qrcode"></div>
                    
                    <!-- Action Buttons -->
                    <div class="space-y-3">
                        <button onclick="downloadQR()" class="btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" x2="12" y1="15" y2="3"></line>
                            </svg>
                            <span>Tải xuống mã QR</span>
                        </button>
                        <button onclick="navigate('')" class="btn-secondary">
                            <span>Về trang chủ</span>
                        </button>
                    </div>
                    
                    <!-- Warning -->
                    <div class="p-4 bg-red-50 border-2 border-red-100 rounded-xl">
                        <p class="text-sm text-red-700 text-center">
                            ⚠️ <strong>Mất mã QR = mất thư vĩnh viễn</strong><br>
                            Hãy lưu cẩn thận!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Create encrypted letter with time lock
 */
async function createLetter() {
    const message = document.getElementById('message').value.trim();
    const unlockDateStr = document.getElementById('unlock-date').value;
    const password = document.getElementById('password').value;
    
    // Validation
    if (!message) {
        alert('Vui lòng nhập lời nhắn!');
        return;
    }
    
    if (!unlockDateStr) {
        alert('Vui lòng chọn ngày mở!');
        return;
    }
    
    try {
        // Parse unlock date
        const unlockDate = new Date(unlockDateStr + 'T00:00:00');
        
        // Seal message using Web Crypto API
        console.log('🔒 Sealing message...');
        const sealed = await sealMessage(message, unlockDate, password);
        
        // Serialize for QR code
        const qrData = serializeSealedQR(sealed);
        
        console.log('✅ Message sealed successfully');
        console.log('📦 QR data size:', qrData.length, 'bytes');
        
        // Generate QR code
        const qrcodeElement = document.getElementById('qrcode');
        generateQRCode(qrData, qrcodeElement);
        
        // Show result
        document.getElementById('qr-result').classList.remove('hidden');
        
        // Scroll to result
        setTimeout(() => {
            document.getElementById('qr-result').scrollIntoView({ behavior: 'smooth' });
        }, 100);
        
    } catch (error) {
        console.error('❌ Error creating letter:', error);
        alert('Có lỗi xảy ra khi tạo thư. Vui lòng thử lại.');
    }
}