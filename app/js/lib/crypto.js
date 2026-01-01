/**
 * Cryptographic operations for sealing and unsealing messages
 * Uses Web Crypto API only - no third-party libraries
 * 
 * SECURITY PRINCIPLES:
 * - All crypto happens client-side only
 * - Message content never stored after sealing
 * - Decryption explicitly blocked before unlockDate
 * - Passwords never stored or logged
 * - Clear error codes for debugging
 */

const PBKDF2_ITERATIONS = 100000;
const SALT_LENGTH = 16; // bytes
const IV_LENGTH = 12;   // bytes for GCM

/**
 * Derive AES key from password using PBKDF2
 * SPEC v1: PBKDF2-SHA256, 100k iterations, NO password.trim()
 * @param {string} password - User password (KHÔNG trim)
 * @param {Uint8Array} salt - 16 bytes salt
 * @returns {Promise<CryptoKey>} AES-256-GCM key
 */
async function deriveKey(password, salt) {
    // Import password - UTF-8 encoding, NO TRIM
    const passwordKey = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password), // UTF-8, giữ nguyên spaces
        'PBKDF2',
        false,
        ['deriveKey']
    );
    
    // Derive AES-256 key - MUST be 100000 iterations
    return await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000, // SPEC v1: PHẢI ĐÚNG 100000
            hash: 'SHA-256'
        },
        passwordKey,
        {
            name: 'AES-GCM',
            length: 256
        },
        false,
        ['encrypt', 'decrypt']
    );
}

/**
 * Seal a message with encryption and time lock
 * SPEC v1: payload = ciphertext || tag (16 bytes), base64 standard
 * @param {string} message - Plain text message
 * @param {Date} unlockDate - Date when message can be opened
 * @param {string} [password] - Optional password (KHÔNG trim)
 * @returns {Promise<SealedQRv1>} Sealed message object
 */
async function sealMessage(message, unlockDate, password) {
    // Generate random salt (16 bytes) and IV (12 bytes for GCM)
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // NO TRIM - giữ nguyên password user nhập
    const effectivePassword = password || '';
    
    // Derive key
    const key = await deriveKey(effectivePassword, salt);
    
    // Encrypt message
    const messageBytes = new TextEncoder().encode(message);
    
    // AES-GCM trả về: ciphertext || tag (16 bytes)
    const encrypted = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv,
            tagLength: 128 // 16 bytes tag
        },
        key,
        messageBytes
    );
    
    // SPEC v1: payload = ciphertext + tag (đã gộp sẵn từ WebCrypto)
    // Base64 STANDARD (không phải base64url)
    const sealed = {
        version: 1,
        kdf: 'PBKDF2-SHA256',
        cipher: 'AES-256-GCM',
        unlockDate: unlockDate.toISOString(),
        hasPassword: !!(password && password.length > 0),
        salt: arrayBufferToBase64(salt),
        iv: arrayBufferToBase64(iv),
        payload: arrayBufferToBase64(encrypted) // ct + tag (16 bytes cuối)
    };
    
    return sealed;
}

/**
 * Unseal and decrypt a message
 * CRITICAL: This function enforces the time lock
 * SPEC v1: CHECK DATE BEFORE DECRYPT
 * 
 * @param {SealedQRv1} data - Sealed message data
 * @param {string} [password] - Password (KHÔNG trim)
 * @param {Date} currentTime - Current time for time lock check
 * @returns {Promise<string>} Decrypted message
 * @throws {Error} With codes: NOT_YET_OPENABLE, WRONG_PASSWORD, INVALID_FORMAT
 */
async function unsealMessage(data, password, currentTime) {
    // 1️⃣ CHECK VERSION
    if (data.version !== 1) {
        const error = new Error('Unsupported version');
        error.code = 'UNSUPPORTED_VERSION';
        throw error;
    }
    
    // 2️⃣ CHECK DATE BEFORE DECRYPT (CRITICAL)
    const now = currentTime.getTime();
    const unlockTime = Date.parse(data.unlockDate);
    
    if (now < unlockTime) {
        const error = new Error('Chưa đến ngày mở thư');
        error.code = 'NOT_YET_OPENABLE';
        error.unlockDate = new Date(unlockTime);
        error.daysRemaining = Math.ceil((unlockTime - now) / (1000 * 60 * 60 * 24));
        throw error;
    }
    
    // 3️⃣ BASE64 DECODE - standard base64
    const salt = base64ToArrayBuffer(data.salt);
    const iv = base64ToArrayBuffer(data.iv);
    const payload = base64ToArrayBuffer(data.payload);
    
    // Validate lengths
    if (salt.byteLength !== 16) throw new Error('INVALID_SALT');
    if (iv.byteLength !== 12) throw new Error('INVALID_IV');
    if (payload.byteLength <= 16) throw new Error('INVALID_PAYLOAD');
    
    // 4️⃣ DECRYPT - payload = ciphertext + tag (16 bytes)
    const effectivePassword = password || ''; // NO TRIM
    
    try {
        const key = await deriveKey(effectivePassword, new Uint8Array(salt));
        
        // WebCrypto expects: ciphertext + tag (đã gộp sẵn trong payload)
        const decryptedBytes = await crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: new Uint8Array(iv),
                tagLength: 128 // 16 bytes
            },
            key,
            payload
        );
        
        return new TextDecoder().decode(decryptedBytes);
        
    } catch (error) {
        // Decrypt failed =or = new Error('Mật khẩu không đúng');
        wrongPasswordError.code = 'WRONG_PASSWORD';
        throw wrongPasswordError;
    }
}