/**
 * Onboarding Page - 3 slides giới thiệu app
 * Hiển thị lần đầu khi user nhấn "Tạo thư"
 */

let currentSlide = 0;

const slides = [
    {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>`,
        iconBg: 'bg-blue-100',
        title: 'Chào mừng đến với Thư Niêm Phong',
        description: 'Gửi lời nhắn cho tương lai, an toàn và riêng tư.',
        button: 'Tiếp tục'
    },
    {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>`,
        iconBg: 'bg-green-100',
        title: 'Hoàn toàn Offline',
        description: 'Dữ liệu được mã hóa trên thiết bị của bạn. Không có máy chủ, không lưu đám mây.',
        button: 'Tiếp tục'
    },
    {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-600">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
            <path d="m9 12 2 2 4-4"></path>
        </svg>`,
        iconBg: 'bg-red-100',
        title: 'Bạn giữ chìa khóa',
        description: 'Nếu làm mất mã QR hoặc quên mật khẩu, nội dung sẽ mất vĩnh viễn. Không thể khôi phục.',
        button: 'Bắt đầu ngay'
    }
];

function renderOnboarding() {
    currentSlide = 0; // Reset về slide đầu
    const container = document.getElementById('app-container');
    
    container.innerHTML = `
        <div class="flex-grow flex items-center justify-center bg-white p-6">
            <div class="w-full max-w-md">
                <!-- Slide Content -->
                <div id="slide-content" class="text-center space-y-8 animate-fade-in">
                    <!-- Icon sẽ được render động -->
                </div>
                
                <!-- Dots Indicator -->
                <div class="flex justify-center gap-2 mt-12" id="dots-indicator">
                    ${slides.map((_, index) => `
                        <div class="w-2 h-2 rounded-full transition-all ${index === 0 ? 'bg-blue-600 w-8' : 'bg-slate-300'}"></div>
                    `).join('')}
                </div>
                
                <!-- Button -->
                <div class="mt-12">
                    <button onclick="nextSlide()" id="onboarding-btn" class="w-full py-4 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-all flex items-center justify-center gap-2">
                        <span id="btn-text">Tiếp tục</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    renderSlide(0);
}

function renderSlide(index) {
    const slide = slides[index];
    const slideContent = document.getElementById('slide-content');
    
    slideContent.innerHTML = `
        <!-- Icon Circle -->
        <div class="flex justify-center">
            <div class="${slide.iconBg} w-32 h-32 rounded-full flex items-center justify-center">
                ${slide.icon}
            </div>
        </div>
        
        <!-- Title -->
        <h1 class="text-3xl font-black text-slate-900 px-4">
            ${slide.title}
        </h1>
        
        <!-- Description -->
        <p class="text-slate-600 leading-relaxed px-6">
            ${slide.description}
        </p>
    `;
    
    // Update dots
    const dotsContainer = document.getElementById('dots-indicator');
    dotsContainer.innerHTML = slides.map((_, i) => `
        <div class="transition-all ${i === index ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'} h-2 rounded-full"></div>
    `).join('');
    
    // Update button text
    document.getElementById('btn-text').textContent = slide.button;
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        // Chuyển slide tiếp theo
        currentSlide++;
        renderSlide(currentSlide);
    } else {
        // Đã xem hết → lưu flag và chuyển đến editor
        localStorage.setItem('onboardingCompleted', 'true');
        navigate('editor');
    }
}
