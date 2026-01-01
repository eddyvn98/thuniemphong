// Encryption and decryption utilities

function createEncryptedData(message, unlockDate, password) {
    const data = {
        message: message,
        unlockDate: unlockDate,
        createdAt: new Date().toISOString()
    };
    
    // Encrypt if password provided
    if (password) {
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
        return JSON.stringify({
            encrypted: true,
            data: encrypted
        });
    } else {
        return JSON.stringify({
            encrypted: false,
            data: data
        });
    }
}

function decryptData(encryptedData, password) {
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedData, password);
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        
        if (!decryptedText) {
            return null;
        }
        
        return JSON.parse(decryptedText);
    } catch (error) {
        return null;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}