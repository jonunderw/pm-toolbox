const crypto = require('crypto');
const os = require('os');

// Generate a deterministic key based on machine characteristics
function getMachineKey() {
  const machineInfo = `${os.hostname()}-${os.userInfo().username}-${os.platform()}`;
  return crypto.createHash('sha256').update(machineInfo).digest();
}

// Generate a random IV for each encryption
function generateIV() {
  return crypto.randomBytes(16);
}

// Encrypt a string using AES-256-CBC
function encrypt(text) {
  try {
    const key = getMachineKey();
    const iv = generateIV();
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Prepend IV to encrypted data (IV is not secret)
    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    throw new Error(`Encryption failed: ${error.message}`);
  }
}

// Decrypt a string using AES-256-CBC
function decrypt(encryptedText) {
  try {
    const key = getMachineKey();
    const textParts = encryptedText.split(':');
    
    if (textParts.length !== 2) {
      throw new Error('Invalid encrypted text format');
    }
    
    const iv = Buffer.from(textParts[0], 'hex');
    const encryptedData = textParts[1];
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    throw new Error(`Decryption failed: ${error.message}`);
  }
}

// Generate a secure random password/key
function generateSecureKey(length = 32) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    result += charset[randomIndex];
  }
  
  return result;
}

// Hash a string using SHA-256
function hash(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

// Verify if a text matches a hash
function verifyHash(text, hashedText) {
  return hash(text) === hashedText;
}

// Create HMAC signature
function createHMAC(data, secret) {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

// Verify HMAC signature
function verifyHMAC(data, signature, secret) {
  const expectedSignature = createHMAC(data, secret);
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// Generate a UUID v4
function generateUUID() {
  return crypto.randomUUID();
}

// Securely compare two strings (timing-safe)
function secureCompare(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

// Encrypt object (convenience method)
function encryptObject(obj) {
  return encrypt(JSON.stringify(obj));
}

// Decrypt object (convenience method)
function decryptObject(encryptedText) {
  const decryptedText = decrypt(encryptedText);
  return JSON.parse(decryptedText);
}

// Mask sensitive data for display purposes
function maskSensitiveData(data, visibleChars = 4) {
  if (typeof data !== 'string' || data.length <= visibleChars * 2) {
    return '*'.repeat(Math.max(8, data?.length || 8));
  }
  
  const start = data.substring(0, visibleChars);
  const end = data.substring(data.length - visibleChars);
  const middle = '*'.repeat(Math.max(4, data.length - (visibleChars * 2)));
  
  return start + middle + end;
}

// Generate a salt for password hashing
function generateSalt(length = 16) {
  return crypto.randomBytes(length).toString('hex');
}

// Hash password with salt using PBKDF2
function hashPassword(password, salt = null) {
  const actualSalt = salt || generateSalt();
  const hash = crypto.pbkdf2Sync(password, actualSalt, 10000, 64, 'sha512').toString('hex');
  
  return {
    hash,
    salt: actualSalt
  };
}

// Verify password against hash
function verifyPassword(password, hash, salt) {
  const { hash: computedHash } = hashPassword(password, salt);
  return secureCompare(computedHash, hash);
}

module.exports = {
  encrypt,
  decrypt,
  generateSecureKey,
  hash,
  verifyHash,
  createHMAC,
  verifyHMAC,
  generateUUID,
  secureCompare,
  encryptObject,
  decryptObject,
  maskSensitiveData,
  generateSalt,
  hashPassword,
  verifyPassword
};
