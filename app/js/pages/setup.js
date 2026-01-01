/**
 * Setup Page - Màn thiết lập niêm phong (Step 2)
 * Chọn ngày mở + mật khẩu + biometric
 */

let setupData = {
    unlockDate: null,
    password: '',
    usePassword: false,
    useBiometric: false
};

function renderSetup() {
    const container = document.getElementById('app-container');
    
    // Default date: hôm nay
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    if (!setupData.unlockDate) {
        setupData.unlockDate = todayStr;
    }
    
    container.innerHTML = `
        <div class="flex-grow overflow-y-auto bg-white">
            <!-- Header -->
            <header class="p-4 flex items-center border-b border-slate-100 sticky top-0 bg-white z-10">
                <button onclick="renderEditor()" class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                    </svg>
                </button>
                <h1 class="flex-1 text-center font-bold text-lg pr-10">Thiết lập Niêm phong</h1>
            </header>
            
            <!-- Content -->
            <div class="p-6 space-y-8 max-w-2xl mx-auto">
                
                <!-- Ngày được phép mở -->
                <div class="space-y-4">
                    <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Ngày được phép mở</label>
                    <div class="text-center py-2">
                        <div class="text-4xl font-black text-slate-900" id="display-date">
                            01 Th01, 2026
                        </div>
                    </div>
                    
                    <!-- Calendar -->
                    <div class="bg-slate-50 p-4 rounded-2xl">
                        <div class="flex items-center justify-between mb-4">
                            <button onclick="changeMonth(-1)" class="p-2 hover:bg-white rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="m15 18-6-6 6-6"></path>
                                </svg>
                            </button>
                            <div class="font-bold text-slate-900" id="month-year">Tháng 01 2026</div>
                            <button onclick="changeMonth(1)" class="p-2 hover:bg-white rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </button>
                        </div>
                        
                        <!-- Day headers -->
                        <div class="grid grid-cols-7 gap-2 mb-2">
                            ${['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => 
                                `<div class="text-center text-xs font-semibold text-slate-400">${day}</div>`
                            ).join('')}
                        </div>
                        
                        <!-- Calendar grid -->
                        <div class="grid grid-cols-7 gap-2" id="calendar-grid">
                            <!-- Will be populated by JS -->
                        </div>
                    </div>
                </div>
                
                <!-- Thêm mật khẩu -->
                <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div class="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <span class="font-semibold text-slate-700">Thêm mật khẩu (Tùy chọn)</span>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="password-toggle" onchange="togglePassword()" class="sr-only peer" ${setupData.usePassword ? 'checked' : ''}>
                            <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    
                    <!-- Password input (hidden by default) -->
                    <div id="password-input-container" class="${setupData.usePassword ? '' : 'hidden'} space-y-3">
                        <input 
                            type="password" 
                            id="password-input"
                            value="${setupData.password}"
                            oninput="setupData.password = this.value"
                            class="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none"
                            placeholder="Nhập mật khẩu..."
                        />
                        
                        <!-- Warning -->
                        <div class="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl flex items-start gap-3">
                            <span class="text-2xl">⚠️</span>
                            <p class="text-sm text-yellow-800 font-medium">Quên mật khẩu = Mất thư vĩnh viễn.</p>
                        </div>
                    </div>
                </div>
                
                <!-- Khóa sinh trắc học -->
                <div class="space-y-2">
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div class="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
                                <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"></path>
                                <path d="M14 13.12c0 2.38 0 6.38-1 8.88"></path>
                                <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"></path>
                                <path d="M2 12a10 10 0 0 1 18-6"></path>
                                <path d="M2 16h.01"></path>
                                <path d="M21.8 16c.2-2 .131-5.354 0-6"></path>
                                <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"></path>
                                <path d="M8.65 22c.21-.66.45-1.32.57-2"></path>
                                <path d="M9 6.8a6 6 0 0 1 9 5.2v2"></path>
                            </svg>
                            <div class="flex-1">
                                <div class="font-semibold text-slate-700">Khóa Sinh trắc học</div>
                                <div class="text-xs text-slate-500">Yêu cầu Vân tay/FaceID trên máy nhận</div>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="biometric-toggle" onchange="setupData.useBiometric = this.checked" class="sr-only peer" ${setupData.useBiometric ? 'checked' : ''}>
                            <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                    </div>
                </div>
                
                <!-- Hold to Confirm Button -->
                <div class="pt-4">
                    <button 
                        id="seal-button"
                        onmousedown="startHoldToSeal()"
                        onmouseup="cancelHoldToSeal()"
                        onmouseleave="cancelHoldToSeal()"
                        ontouchstart="startHoldToSeal()"
                        ontouchend="cancelHoldToSeal()"
                        class="w-full py-4 px-8 bg-blue-600 text-white font-bold rounded-full shadow-lg transition-all flex items-center justify-center gap-3"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                        </svg>
                        <span>Nhấn giữ 5s để Niêm Phong</span>
                    </button>
                </div>
                
            </div>
        </div>
    `;
    
    // Render calendar
    renderCalendar();
    updateDisplayDate();
}

let currentCalendarDate = new Date();

function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    // Update month/year display
    document.getElementById('month-year').textContent = 
        `Tháng ${String(month + 1).padStart(2, '0')} ${year}`;
    
    // Get first day of month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Build grid
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';
    
    // Empty cells before month starts
    for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += '<div></div>';
    }
    
    // Days of month
    const today = new Date();
    const selectedDate = new Date(setupData.unlockDate);
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().split('T')[0];
        const isSelected = dateStr === setupData.unlockDate;
        const isPast = date < today && dateStr !== today.toISOString().split('T')[0];
        
        grid.innerHTML += `
            <button 
                onclick="selectDate('${dateStr}')"
                ${isPast ? 'disabled' : ''}
                class="aspect-square flex items-center justify-center rounded-full font-medium transition-all
                    ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-slate-700'}
                    ${isPast ? 'opacity-30 cursor-not-allowed' : ''}
                "
            >
                ${day}
            </button>
        `;
    }
}

function changeMonth(delta) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + delta);
    renderCalendar();
}

function selectDate(dateStr) {
    setupData.unlockDate = dateStr;
    renderCalendar();
    updateDisplayDate();
}

function updateDisplayDate() {
    const date = new Date(setupData.unlockDate);
    const formatted = date.toLocaleDateString('vi-VN', { 
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    document.getElementById('display-date').textContent = formatted;
}

function togglePassword() {
    setupData.usePassword = document.getElementById('password-toggle').checked;
    const container = document.getElementById('password-input-container');
    
    if (setupData.usePassword) {
        container.classList.remove('hidden');
    } else {
        container.classList.add('hidden');
        setupData.password = '';
    }
}

let holdTimer = null;

function startHoldToSeal() {
    const button = document.getElementById('seal-button');
    button.classList.add('scale-95', 'bg-blue-700');
    
    // Start countdown
    holdTimer = setTimeout(() => {
        // Show countdown warning screen
        renderCountdownWarning();
    }, 0); // Immediate transition to countdown
}

function cancelHoldToSeal() {
    const button = document.getElementById('seal-button');
    button.classList.remove('scale-95', 'bg-blue-700');
    
    if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
    }
}
