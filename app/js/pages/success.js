/**
 * Success Page - Màn hoàn tất với QR (Step 4)
 * Hiển thị QR + thông tin + nút Lưu/Chia sẻ
 */

function renderSuccess(qrData, config) {
    // Store data if provided as parameters
    if (qrData) successData.qrData = qrData;
    if (config) successData.config = config;
    
    const data = successData.qrData;
    const conf = successData.config;
    
    // If no data, redirect to home
    if (!data || !conf) {
        console.warn('No success data available, redirecting to home');
        navigate('');
        return;
    }

    const container = document.getElementById('app-container');
    
    // Format date
    const unlockDate = new Date(conf.unlockDate);
    const formattedDate = unlockDate.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    
    container.innerHTML = `
        <div class="flex-grow overflow-y-auto bg-white">
            <div class="p-6 space-y-8 max-w-2xl mx-auto">
                
                <!-- Capture Area (toàn bộ phần này sẽ được chụp) -->
                <div id="capture-area" style="background-color: #f8fafc; padding: 40px 24px; border-radius: 0;">
                    <!-- Success Icon -->
                    <div style="text-align: center; margin-bottom: 32px;">
                        <div style="width: 80px; height: 80px; margin: 0 auto 24px; background-color: rgba(34, 197, 94, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 6 9 17l-5-5"></path>
                            </svg>
                        </div>
                        
                        <h1 style="font-size: 32px; font-weight: 900; color: #0f172a; margin-bottom: 16px;">Đã Niêm Phong Xong!</h1>
                        <p style="color: #64748b; font-size: 16px; line-height: 1.6; max-width: 400px; margin: 0 auto;">
                            Thư đã được niêm phong<br/>
                            Truy cập <span style="font-weight: 600; color: #2563eb;">thuniemphong2025.web.app</span> để mở
                        </p>
                    </div>
                    
                    <!-- QR Code -->
                    <div style="background-color: white; padding: 32px; border-radius: 16px; display: flex; justify-content: center; margin-bottom: 32px; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1);" id="qrcode"></div>
                    
                    <!-- Password Display (if exists) -->
                    ${conf.usePassword ? `
                        <div style="background-color: white; padding: 20px; border-radius: 16px; margin-bottom: 24px; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1);">
                            <label style="display: block; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Mật khẩu của bạn</label>
                            <div style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; background-color: #f1f5f9; border-radius: 8px;">
                                <span style="flex: 1; font-family: monospace; font-size: 18px; color: #0f172a;" id="password-display">••••••••</span>
                                <button onclick="togglePasswordVisibility()" style="padding: 8px; background-color: transparent; border: none; cursor: pointer; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
                                    <svg id="eye-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Info Card -->
                    <div style="background-color: white; padding: 24px; border-radius: 16px; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1);">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                            </svg>
                            <span style="font-size: 13px; font-weight: 700; color: #2563eb; text-transform: uppercase; letter-spacing: 0.05em;">Thông tin thư</span>
                        </div>
                        
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="display: flex; gap: 8px; margin-bottom: 12px; align-items: flex-start;">
                                <span style="color: #64748b; margin-top: 2px; flex-shrink: 0;">•</span>
                                <span style="font-size: 15px; color: #475569; line-height: 1.5;">Lưu ảnh màn hình này hoặc tải ảnh QR về máy.</span>
                            </li>
                            <li style="display: flex; gap: 8px; margin-bottom: 12px; align-items: flex-start;">
                                <span style="color: #64748b; margin-top: 2px; flex-shrink: 0;">•</span>
                                <span style="font-size: 15px; color: #475569; line-height: 1.5;">Ngày mở thư: <strong style="color: #0f172a;">${formattedDate}</strong></span>
                            </li>
                            <li style="display: flex; gap: 8px; align-items: flex-start;">
                                <span style="color: #ea580c; margin-top: 2px; flex-shrink: 0;">•</span>
                                <span style="font-size: 15px; color: #ea580c; font-weight: 600; line-height: 1.5;">Ứng dụng không lưu lại thông tin này!</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <!-- Action Buttons (KHÔNG capture) -->
                <div class="space-y-3">
                    <!-- Row 1: Lưu ảnh + Chia sẻ -->
                    <div class="grid grid-cols-2 gap-3">
                        <button onclick="downloadQRCard()" class="btn-secondary py-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" x2="12" y1="15" y2="3"></line>
                            </svg>
                            <span>Lưu ảnh</span>
                        </button>
                        <button onclick="shareQR()" class="btn-secondary py-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                <polyline points="16 6 12 2 8 6"></polyline>
                                <line x1="12" x2="12" y1="2" y2="15"></line>
                            </svg>
                            <span>Chia sẻ</span>
                        </button>
                    </div>
                    
                    <!-- Row 2: Tạo thư mới (Primary) -->
                    <button onclick="createNewLetter()" class="btn-primary shadow-lg text-lg py-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                        <span>Tạo thư mới</span>
                    </button>
                    
                    <!-- Link: Quay lại -->
                    <div class="text-center">
                        <button onclick="goHome()" class="text-slate-500 text-sm hover:text-blue-600 transition-colors">
                            Quay lại trang chủ
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    `;
    
    // Generate QR code
    const qrcodeElement = document.getElementById('qrcode');
    generateQRCode(data, qrcodeElement);
}

// Store password for visibility toggle
let storedPassword = '';

function togglePasswordVisibility() {
    const display = document.getElementById('password-display');
    const icon = document.getElementById('eye-icon');
    
    if (display.textContent === '••••••••') {
        // Show password
        display.textContent = successData.config.password;
        icon.innerHTML = `
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
            <line x1="2" x2="22" y1="2" y2="22"></line>
        `;
    } else {
        // Hide password
        display.textContent = '••••••••';
        icon.innerHTML = `
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        `;
    }
}

function downloadQRCard() {
    const captureArea = document.getElementById('capture-area');
    
    if (!captureArea) {
        alert('Không tìm thấy nội dung để lưu');
        return;
    }
    
    // Use html2canvas to capture the entire card with better settings
    html2canvas(captureArea, {
        backgroundColor: '#ffffff',
        scale: 3, // Higher quality for better rendering
        logging: false,
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: false,
        imageTimeout: 0,
        removeContainer: true
    }).then(canvas => {
        // Convert to blob and download
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `thu-niem-phong-${Date.now()}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        }, 'image/png', 1.0);
    }).catch(err => {
        console.error('Error capturing:', err);
        alert('Có lỗi khi lưu ảnh. Vui lòng thử lại.');
    });
}

function shareQR() {
    const captureArea = document.getElementById('capture-area');
    
    if (!captureArea) {
        alert('Không tìm thấy nội dung để chia sẻ');
        return;
    }
    
    html2canvas(captureArea, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
    }).then(canvas => {
        canvas.toBlob(async blob => {
            const file = new File([blob], 'thu-niem-phong.png', { type: 'image/png' });
            
            // Check if Web Share API is supported
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: 'Thư Niêm Phong',
                        text: 'Mã QR thư niêm phong của tôi',
                        files: [file]
                    });
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.log('Share cancelled or failed');
                    }
                }
            } else {
                // Fallback: download
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `thu-niem-phong-${Date.now()}.png`;
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
            }
        }, 'image/png');
    }).catch(err => {
        console.error('Error capturing:', err);
        alert('Có lỗi khi chia sẻ. Vui lòng thử lại.');
    });
}

function createNewLetter() {
    // Reset data
    editorData = { message: '', isLink: false };
    setupData = { unlockDate: null, password: '', usePassword: false, useBiometric: false };
    successData = { qrData: null, config: null };
    
    // Go to editor
    navigate('editor');
}

function goHome() {
    // Reset data
    successData = { qrData: null, config: null };
    
    // Navigate to home
    navigate('');
}
