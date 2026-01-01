/**
 * Format utilities for SealedQR v1
 * Defines the structure and serialization for sealed messages
 */

/**
 * SealedQR Version 1 format
 * @typedef {Object} SealedQRv1
 * @property {number} version - Format version (always 1)
 * @property {string} kdf - Key derivation function (PBKDF2-SHA256)
 * @property {string} cipher - Encryption cipher (AES-256-GCM)
 * @property {string} unlockDate - ISO date string when message can be opened
 * @property {string} salt - Base64 encoded salt for KDF
 * @property {string} iv - Base64 encoded initialization vector
 * @property {string} payload - Base64 encoded ciphertext
 */

/**
 * Convert ArrayBuffer to base64 string
 */
function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

/**
 * Convert base64 string to ArrayBuffer
 */
function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

/**
 * Serialize SealedQR object to base64 string
 * SPEC v1: base64(JSON.stringify(data))
 * @param {SealedQRv1} data - Sealed message data
 * @returns {string} Base64 encoded JSON for QR code
 */
function serializeSealedQR(data) {
    // Validate required fields
    if (data.version !== 1) {
        throw new Error('INVALID_FORMAT: Unsupported version');
    }
    
    if (!data.unlockDate || !data.salt || !data.iv || !data.payload) {
        throw new Error('INVALID_FORMAT: Missing required fields');
    }
    
    // CRITICAL: base64(JSON) - NOT plain JSON
    try {
        const json = JSON.stringify(data);
        return btoa(json);
    } catch (error) {
        throw new Error('INVALID_FORMAT');
    }
}

/**
 * Deserialize base64 string to SealedQR object
 * SPEC v1: JSON.parse(atob(base64))
 * @param {string} raw - Base64 encoded JSON from QR code
 * @returns {SealedQRv1} Parsed sealed message data
 */
function deserializeSealedQR(raw) {
    let data;
    
    try {
        // CRITICAL: atob(base64) → JSON.parse()
        const json = atob(raw);
        data = JSON.parse(json);
    } catch (error) {
        throw new Error('INVALID_FORMAT: Not valid base64 JSON');
    }
    
    // Validate version
    if (data.version !== 1) {
        throw new Error('INVALID_FORMAT: Unsupported version ' + data.version);
    }
    
    // Validate required fields
    const required = ['kdf', 'cipher', 'unlockDate', 'salt', 'iv', 'payload'];
    for (const field of required) {
        if (!data[field]) {
            throw new Error('INVALID_FORMAT: Missing field ' + field);
        }
    }
    
    // Validate algorithms
    if (data.kdf !== 'PBKDF2-SHA256') {
        throw new Error('INVALID_FORMAT: Unsupported KDF');
    }
    
    if (data.cipher !== 'AES-256-GCM') {
        throw new Error('INVALID_FORMAT: Unsupported cipher');
    }
    
    return data;
}