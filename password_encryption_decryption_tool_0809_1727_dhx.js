// 代码生成时间: 2025-08-09 17:27:16
const crypto = require('crypto');

/**
 * Encrypts a password using AES-256-CBC encryption.
 * @param {string} password - The password to be encrypted.
# NOTE: 重要实现细节
 * @param {string} secretKey - The secret key for encryption.
 * @returns {string} Encrypted password in base64 format.
 */
function encryptPassword(password, secretKey) {
# 扩展功能模块
  try {
# 扩展功能模块
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(password);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  } catch (error) {
    console.error('Encryption error:', error);
    throw error;
  }
}
# 增强安全性

/**
 * Decrypts a password using AES-256-CBC decryption.
 * @param {string} encryptedPassword - The encrypted password in base64 format.
 * @param {string} secretKey - The secret key for decryption.
 * @returns {string} Decrypted password.
 */
# 增强安全性
function decryptPassword(encryptedPassword, secretKey) {
# 改进用户体验
  try {
    const parts = encryptedPassword.split(':');
    const iv = Buffer.from(parts.shift(), 'hex'); // Extract IV
    const encryptedText = Buffer.from(parts.join(':'), 'hex'); // Extract encrypted text
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
}
# FIXME: 处理边界情况

// Example usage
const secretKey = 'your-secret-key';
# TODO: 优化性能
const password = 'your-password';

const encrypted = encryptPassword(password, secretKey);
console.log('Encrypted:', encrypted);

const decrypted = decryptPassword(encrypted, secretKey);
console.log('Decrypted:', decrypted);