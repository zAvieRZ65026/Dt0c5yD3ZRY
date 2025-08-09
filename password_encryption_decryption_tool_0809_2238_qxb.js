// 代码生成时间: 2025-08-09 22:38:44
const crypto = require('crypto');

class PasswordTool {
  // Encrypts a password using AES-256-CBC algorithm
  static encryptPassword(password, secretKey) {
    try {
      // Check if the secret key is provided
      if (!secretKey) {
        throw new Error('Secret key is required for encryption.');
      }

      // Create a new cipher instance using the secret key and a random initialization vector
      const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), crypto.randomBytes(16));

      // Encrypt the password and append padding
      let encrypted = cipher.update(password, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      return encrypted;
    } catch (error) {
      console.error('Encryption error:', error.message);
      throw error;
    }
  }

  // Decrypts a password using AES-256-CBC algorithm
  static decryptPassword(encryptedPassword, secretKey) {
    try {
      // Check if the secret key is provided
      if (!secretKey) {
        throw new Error('Secret key is required for decryption.');
      }

      // Create a new decipher instance using the secret key and the same initialization vector used during encryption
      const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), Buffer.from(encryptedPassword.slice(0, 32), 'hex'));

      // Decrypt the password and remove padding
      let decrypted = decipher.update(encryptedPassword.slice(32), 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error.message);
      throw error;
    }
  }
}

// Export the PasswordTool class for use in other modules
module.exports = PasswordTool;