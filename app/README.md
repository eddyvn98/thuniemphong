# Thư Niêm Phong

**Gửi một lời nhắn cho tương lai - Chỉ mở ra khi tới đúng lúc**

## 📂 Cấu trúc Project

```
app/
├── index.html              # Entry point
├── css/
│   └── style.css          # Custom styles
└── js/
    ├── lib/               # Core cryptography libraries
    │   ├── format.js      # SealedQR format (Version 1)
    │   └── crypto.js      # Web Crypto API implementation
    ├── utils/             # Utility functions
    │   ├── camera.js      # Camera & QR scanner management
    │   └── qr.js          # QR code generation
    ├── pages/             # Page components
    │   ├── home.js        # Landing page
    │   ├── create.js      # Create sealed letter
    │   ├── scan.js        # Scan QR code
    │   └── view.js        # View/decrypt letter
    ├── router.js          # Hash-based SPA router
    └── app.js             # App initialization
```

## 🔐 Security Architecture

### Core Principles (Non-Negotiable)

1. ✅ **Client-side only** - No backend, no storage
2. ✅ **Web Crypto API** - Native browser cryptography (không dùng thư viện bên thứ 3)
3. ✅ **Time-lock enforced** - Kiểm tra ngày TRƯỚC KHI giải mã
4. ✅ **Zero data retention** - Không lưu trữ sau khi tạo QR
5. ✅ **No password recovery** - Mất mật khẩu = mất vĩnh viễn

### Cryptographic Specification

**Format: SealedQR v1**

```typescript
{
  version: 1
  kdf: "PBKDF2-SHA256"        // 100,000 iterations
  cipher: "AES-256-GCM"        // Authenticated encryption
  unlockDate: "2026-12-25T00:00:00.000Z"
  salt: "base64..."            // 16 bytes random
  iv: "base64..."              // 12 bytes random (GCM)
  payload: "base64..."         // Encrypted message
}
```

**Key Derivation:**
- Algorithm: PBKDF2-SHA-256
- Iterations: 100,000
- Salt: 16 bytes (random per message)
- Output: 256-bit AES key

**Encryption:**
- Algorithm: AES-256-GCM
- IV: 12 bytes (random per message)
- Authentication: Built-in via GCM mode

### Time-Lock Mechanism

```javascript
// CRITICAL: Check happens BEFORE decryption attempt
if (currentTime < unlockDate) {
    throw new Error('NOT_YET_OPENABLE');
}

// Only then attempt decryption
const message = await decrypt(...);
```

**Tại sao quan trọng?**
- Ngăn brute-force attack trước ngày mở
- Không dựa vào lỗi giải mã để quyết định "chưa mở được"
- Rõ ràng với người dùng: "Chưa đến lúc" vs "Sai mật khẩu"

## 🚀 Chạy Project

### Option 1: Mở trực tiếp file
```bash
# Double click hoặc
Start-Process "app/index.html"
```

### Option 2: Dùng local server (khuyến nghị)
```bash
# Python
python -m http.server 8000

# Node.js
npx serve app

# Hoặc bất kỳ local server nào
```

Truy cập: `http://localhost:8000`

## 📱 Các Tính Năng

### 1. Tạo Thư (`#create`)
- Nhập nội dung tin nhắn
- Chọn ngày mở (date picker)
- Tùy chọn: Thêm mật khẩu
- Tạo mã QR chứa dữ liệu đã mã hóa
- Tải xuống QR code

### 2. Quét QR (`#scan`)
- Quét qua camera (mobile/desktop)
- Chọn ảnh từ thư viện
- Camera tự động tắt khi:
  - Chuyển trang
  - Chọn file
  - Quét thành công

### 3. Mở Thư (`#view`)
- Nhập mật khẩu (hoặc để trống)
- Kiểm tra ngày:
  - ⏰ **Chưa đến ngày**: Hiện đếm ngược
  - ✅ **Đã đến ngày**: Giải mã và hiển thị

## 🛡️ Error Handling

### Error Codes

| Code | Ý nghĩa | Hành động |
|------|---------|-----------|
| `NOT_YET_OPENABLE` | Chưa đến ngày mở | Hiện đếm ngược |
| `WRONG_PASSWORD` | Mật khẩu sai | Cho phép thử lại |
| `INVALID_FORMAT` | QR không hợp lệ | Quét lại |

## 🎨 Design

Thiết kế dựa theo screenshots trong `picture/`:
- Mobile-first (max-width: 448px)
- Color scheme: Blue primary (#2563eb), Slate gray
- Typography: Inter font family
- Icons: Lucide icons (SVG inline)
- Animations: Fade-in, bounce
- Shadows & gradients

## ⚠️ Lưu Ý Quan Trọng

### Cho Người Dùng
1. **Không lưu mật khẩu** - Quên = mất vĩnh viễn
2. **Không lưu nội dung** - Chỉ trong QR code
3. **Mất QR = mất thư** - Lưu cẩn thận
4. **Không có khôi phục** - Zero recovery options

### Cho Developer
1. **Không dùng CryptoJS** - Chỉ Web Crypto API
2. **Kiểm tra ngày TRƯỚC khi decrypt** - Critical security
3. **Clear error codes** - Không leak crypto details
4. **Memory cleanup** - Fill với 0 sau khi dùng
5. **No logging passwords** - Ever

## 🧪 Testing

### Test Flow
1. Tạo thư với ngày trong tương lai
2. Tải QR code
3. Quét QR
4. Kiểm tra: Phải bị chặn với "Chưa đến lúc"
5. Tạo thư với ngày hôm nay
6. Kiểm tra: Mật khẩu đúng → Mở được
7. Kiểm tra: Mật khẩu sai → "Sai mật khẩu"

## 📄 License

Private project - Not for distribution

## 🙏 Credits

- Cryptography: Web Crypto API (W3C Standard)
- QR Generation: qrcode.js
- QR Scanning: html5-qrcode
- CSS Framework: Tailwind CSS
- Font: Inter (Google Fonts)