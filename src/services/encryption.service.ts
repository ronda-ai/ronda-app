
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
// The encryption key should be a 32-byte (256-bit) key.
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
  ? crypto.createHash('sha256').update(String(process.env.ENCRYPTION_KEY)).digest('base64').substring(0, 32)
  : 'a_default_secret_key_that_is_32_bytes_long';

// The IV should be 16 bytes (128 bits) for AES.
const IV_LENGTH = 16;

export class EncryptionService implements IEncryptionService {
  encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Prepend the IV to the encrypted text. It's needed for decryption.
    return iv.toString('hex') + ':' + encrypted;
  }

  decrypt(encryptedText: string): string {
    try {
      const parts = encryptedText.split(':');
      const ivHex = parts.shift();
      if (!ivHex) {
        // Return text as is if it's not in the expected format.
        return encryptedText;
      }
      const iv = Buffer.from(ivHex, 'hex');
      const encrypted = parts.join(':');
      const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      // If decryption fails, it's likely the text wasn't encrypted.
      // Return the original text.
      console.log(error)
      return encryptedText;
    }
  }
}
