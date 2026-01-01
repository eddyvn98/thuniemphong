/**
 * Home Page - Landing page with app introduction
 */
function renderHome() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div class="flex-grow overflow-y-auto">
            
            <!-- Hero Section -->
            <section class="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-white -z-10"></div>
                
                <div class="w-full max-w-2xl space-y-8 animate-fade-in">
                    <!-- Logo -->
                    <div class="relative">
                        <div class="w-32 h-32 mx-auto rounded-full bg-slate-50 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
                            <div class="relative z-10 text-6xl">📮</div>
                        </div>
                    </div>
                    
                    <!-- Heading -->
                    <div class="space-y-4">
                        <h1 class="text-5xl font-black tracking-tight text-slate-900">Thư Niêm Phong</h1>
                        <p class="text-2xl text-slate-600 font-medium">Gửi một lời nhắn cho tương lai</p>
                        <p class="text-lg text-slate-400">Chỉ mở ra khi tới đúng lúc</p>
                    </div>
                    
                    <!-- CTA Buttons -->
                    <div class="space-y-4 pt-4">
                        <button onclick="handleCreateClick()" class="btn-primary shadow-xl shadow-blue-600/20 text-lg py-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5v14"></path>
                            </svg>
                            <span>Tạo thư niêm phong</span>
                        </button>
                        <button onclick="navigate('scan')" class="btn-secondary text-lg py-4">
                            <span>Quét & Mở thư</span>
                        </button>
                    </div>
                    
                    <!-- Scroll Down Hint -->
                    <div class="pt-12 animate-bounce">
                        <p class="text-xs text-slate-300 uppercase tracking-wider">Cuộn xuống để hiểu thêm</p>
                    </div>
                </div>
            </section>
            
            <!-- How It Works Section -->
            <section class="py-20 px-6 bg-slate-50">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-3xl font-bold text-center mb-16 text-slate-900">Cách hoạt động (rất đơn giản)</h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <!-- Step 1 -->
                        <div class="text-center space-y-4">
                            <div class="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
                                    <path d="M13 21h8"></path>
                                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                                </svg>
                            </div>
                            <div class="space-y-2">
                                <h3 class="font-bold text-slate-900">1. Viết lời nhắn</h3>
                                <p class="text-sm text-slate-500 leading-relaxed">Lời dặn, lời xin lỗi, hay điều bạn chưa muốn nói bây giờ</p>
                            </div>
                        </div>
                        
                        <!-- Step 2 -->
                        <div class="text-center space-y-4">
                            <div class="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
                                    <path d="M8 2v4"></path>
                                    <path d="M16 2v4"></path>
                                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                    <path d="M3 10h18"></path>
                                </svg>
                            </div>
                            <div class="space-y-2">
                                <h3 class="font-bold text-slate-900">2. Chọn ngày mở</h3>
                                <p class="text-sm text-slate-500 leading-relaxed">Trước ngày đó, không ai có thể đọc</p>
                            </div>
                        </div>
                        
                        <!-- Step 3 -->
                        <div class="text-center space-y-4">
                            <div class="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
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
                            </div>
                            <div class="space-y-2">
                                <h3 class="font-bold text-slate-900">3. Nhận mã QR</h3>
                                <p class="text-sm text-slate-500 leading-relaxed">Giữ lại, in ra, hoặc gửi cho người bạn muốn</p>
                            </div>
                        </div>
                        
                        <!-- Step 4 -->
                        <div class="text-center space-y-4">
                            <div class="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                                </svg>
                            </div>
                            <div class="space-y-2">
                                <h3 class="font-bold text-slate-900">4. Tới ngày → mở</h3>
                                <p class="text-sm text-slate-500 leading-relaxed">Quét mã QR và đọc nội dung</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Important Info Section -->
            <section class="py-20 px-6 bg-white">
                <div class="max-w-4xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-slate-900 mb-4">Điều quan trọng bạn cần biết</h2>
                        <p class="text-slate-500 max-w-2xl mx-auto">
                            Đây không phải lỗi. Đây là cách để đảm bảo <strong>không ai có quyền đọc thay bạn</strong>.
                        </p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-6 rounded-3xl border-2 border-slate-100 bg-slate-50 space-y-3">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-600">
                                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                                    </svg>
                                </div>
                                <h3 class="font-bold text-slate-900">Không lưu nội dung</h3>
                            </div>
                            <p class="text-sm text-slate-600 leading-relaxed pl-13">Thư của bạn chỉ tồn tại trong mã QR</p>
                        </div>
                        
                        <div class="p-6 rounded-3xl border-2 border-slate-100 bg-slate-50 space-y-3">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-600">
                                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                </div>
                                <h3 class="font-bold text-slate-900">Không lưu mật khẩu</h3>
                            </div>
                            <p class="text-sm text-slate-600 leading-relaxed pl-13">Quên mật khẩu = mất vĩnh viễn</p>
                        </div>
                        
                        <div class="p-6 rounded-3xl border-2 border-slate-100 bg-slate-50 space-y-3">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-600">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <line x1="17" x2="22" y1="8" y2="13"></line>
                                        <line x1="22" x2="17" y1="8" y2="13"></line>
                                    </svg>
                                </div>
                                <h3 class="font-bold text-slate-900">Không có tài khoản</h3>
                            </div>
                            <p class="text-sm text-slate-600 leading-relaxed pl-13">Không đăng ký, không đăng nhập</p>
                        </div>
                        
                        <div class="p-6 rounded-3xl border-2 border-slate-100 bg-slate-50 space-y-3">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-600">
                                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                                        <path d="M12 9v4"></path>
                                        <path d="M12 17h.01"></path>
                                    </svg>
                                </div>
                                <h3 class="font-bold text-slate-900">Không có khôi phục</h3>
                            </div>
                            <p class="text-sm text-slate-600 leading-relaxed pl-13">Mất mã QR = mất vĩnh viễn</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Use Cases Section -->
            <section class="py-20 px-6 bg-slate-50">
                <div class="max-w-5xl mx-auto">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- Do's -->
                        <div class="space-y-6">
                            <div class="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="m9 12 2 2 4-4"></path>
                                </svg>
                                <h2 class="text-2xl font-bold text-slate-900">Nên dùng khi</h2>
                            </div>
                            <div class="space-y-4">
                                <div class="p-5 bg-white rounded-2xl border border-green-100 shadow-sm">
                                    <p class="text-slate-700 leading-relaxed">
                                        Muốn nói điều gì đó <strong>nhưng chưa phải lúc</strong>
                                    </p>
                                </div>
                                <div class="p-5 bg-white rounded-2xl border border-green-100 shadow-sm">
                                    <p class="text-slate-700 leading-relaxed">
                                        Để lại lời dặn <strong>phòng khi có chuyện</strong>
                                    </p>
                                </div>
                                <div class="p-5 bg-white rounded-2xl border border-green-100 shadow-sm">
                                    <p class="text-slate-700 leading-relaxed">
                                        Giữ thông tin <strong>không ai được đọc sớm</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Don'ts -->
                        <div class="space-y-6">
                            <div class="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-600">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="m15 9-6 6"></path>
                                    <path d="m9 9 6 6"></path>
                                </svg>
                                <h2 class="text-2xl font-bold text-slate-900">Không nên dùng khi</h2>
                            </div>
                            <div class="space-y-4">
                                <div class="p-5 bg-white rounded-2xl border border-red-100 shadow-sm">
                                    <p class="text-slate-700 leading-relaxed">Cần khôi phục hoặc hỗ trợ</p>
                                </div>
                                <div class="p-5 bg-white rounded-2xl border border-red-100 shadow-sm">
                                    <p class="text-slate-700 leading-relaxed">Không chấp nhận việc "mất là mất"</p>
                                </div>
                                <div class="p-5 bg-white rounded-2xl border border-red-100 shadow-sm">
                                    <p class="text-slate-700 leading-relaxed">Muốn chỉnh sửa sau khi tạo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Quote Section -->
            <section class="py-20 px-6 bg-white">
                <div class="max-w-3xl mx-auto text-center space-y-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-blue-600">
                        <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
                        <path d="M20 2v4"></path>
                        <path d="M22 4h-4"></path>
                        <circle cx="4" cy="20" r="2"></circle>
                    </svg>
                    <blockquote class="text-2xl md:text-3xl font-medium text-slate-700 leading-relaxed italic">
                        "Ứng dụng không giữ bí mật của bạn.<br>Ứng dụng chỉ giúp bạn giữ lời hứa với thời gian."
                    </blockquote>
                </div>
            </section>
            
            <!-- Final CTA Section -->
            <section class="py-20 px-6 bg-gradient-to-b from-blue-50 to-white">
                <div class="max-w-2xl mx-auto text-center space-y-8">
                    <h2 class="text-3xl font-bold text-slate-900">Bắt đầu tạo thư niêm phong</h2>
                    <p class="text-slate-500">Không cần tài khoản. Không lưu dữ liệu.</p>
                    <div class="space-y-4">
                        <button onclick="handleCreateClick()" class="btn-primary shadow-xl shadow-blue-600/20 text-lg py-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5v14"></path>
                            </svg>
                            <span>Tạo thư niêm phong ngay</span>
                        </button>
                    </div>
                </div>
            </section>
            
        </div>
    `;
}

/**
 * Handle click "Tạo thư" - kiểm tra onboarding
 */
function handleCreateClick() {
    const hasSeenOnboarding = localStorage.getItem('onboardingCompleted');
    
    if (hasSeenOnboarding) {
        // Đã xem rồi → vào editor luôn
        navigate('editor');
    } else {
        // Chưa xem → show onboarding
        navigate('onboarding');
    }
}