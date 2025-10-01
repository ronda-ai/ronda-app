
export interface IEncryptionService {
  encrypt(text: string): string;
  decrypt(encryptedText: string): string;
}
