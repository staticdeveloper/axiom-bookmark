import crypto from 'crypto';
import { config } from '../config';

export class EncryptionService {
  static decryptData(encryptedData: string): string {
    const encryptedBuffer = Buffer.from(encryptedData, 'base64');
    return crypto.privateDecrypt(
      {
        key: config.privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      encryptedBuffer
    ).toString('utf8');
  }
}