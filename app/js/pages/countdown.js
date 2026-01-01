/**
 * Countdown Warning Page - Màn cảnh báo cuối cùng (Step 3)
 * Hold-to-confirm với countdown 3 giây
 */

let countdownValue = 3;
let countdownInterval = null;
let isHolding = false;

function renderCountdownWarning() {
    countdownValue = 3;
    isHolding = false;
    
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div class="fixed inset-0 bg-gradient-to-b from-yellow-500 to-orange-600 flex items-center justify-center z-50">
            <div class="text-center px-8 space-y-8">
                
                <!-- Icon -->
                <div class="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white opacity-90">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                        <path d="m9 12 2 2 4-4"></path>
                    </svg>
                </div>
                
                <!-- Title -->
                <div class="space-y-4">
                    <h1 class="text-white text-2xl font-black tracking-widest">CẢNH BÁO</h1>
                    
                    <!-- Message -->
                    <div class="space-y-1">
                        <p class="text-white text-xl font-bold">Thư đã niêm phong</p>
                        <p class="text-white text-2xl font-black">KHÔNG THỂ CHỈNH SỬA</p>
                    </div>
                    
                    <p class="text-white text-sm opacity-90 max-w-xs mx-auto leading-relaxed">
                        Hãy lưu QR và mật khẩu (nếu có) ngay sau bước này
                    </p>
                </div>
                
                <!-- Countdown Circle -->
                <div class="flex justify-center py-8">
                    <div 
                        id="countdown-circle"
                        class="w-40 h-40 rounded-full border-8 border-white flex items-center justify-center cursor-pointer select-none transition-all hover:scale-105"
                        onmousedown="startCountdown()"
                        onmouseup="stopCountdown()"
                        onmouseleave="stopCountdown()"
                        ontouchstart="startCountdown()"
                        ontouchend="stopCountdown()"
                    >
                        <span class="text-white text-7xl font-black" id="countdown-number">3</span>
                    </div>
                </div>
                
                <!-- Instruction -->
                <p class="text-white text-sm font-bold tracking-wider">THẢ TAY ĐỂ HỦY BỎ</p>
                
            </div>
        </div>
    `;
}

function startCountdown() {
    if (isHolding) return;
    
    isHolding = true;
    countdownValue = 3;
    
    const circle = document.getElementById('countdown-circle');
    const number = document.getElementById('countdown-number');
    
    circle.classList.add('scale-95', 'border-yellow-300');
    
    countdownInterval = setInterval(() => {
        countdownValue--;
        number.textContent = countdownValue;
        
        if (countdownValue <= 0) {
            stopCountdown();
            proceedToSeal();
        }
    }, 1000);
}

function stopCountdown() {
    if (!isHolding) return;
    
    isHolding = false;
    
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    
    const circle = document.getElementById('countdown-circle');
    const number = document.getElementById('countdown-number');
    
    circle.classList.remove('scale-95', 'border-yellow-300');
    
    // Reset to 3 if cancelled
    if (countdownValue > 0) {
        countdownValue = 3;
        number.textContent = '3';
    }
}

async function proceedToSeal() {
    // Clear interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    
    try {
        // Get data from editor and setup
        const message = editorData.message;
        const unlockDate = new Date(setupData.unlockDate + 'T00:00:00');
        const password = setupData.usePassword ? setupData.password : '';
        
        // Seal message
        console.log('🔒 Sealing message...');
        const sealed = await sealMessage(message, unlockDate, password);
        
        // Serialize for QR
        const qrData = serializeSealedQR(sealed);
        
        console.log('✅ Sealed successfully');
        
        // Show success screen
        renderSuccess(qrData, setupData);
        
    } catch (error) {
        console.error('❌ Error sealing:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
        renderSetup();
    }
}
