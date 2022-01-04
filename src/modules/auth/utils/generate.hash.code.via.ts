import { CryptoJS } from 'crypto-js';
import config from 'config';

export function generateHashCode(): string {
  const nonce: number = Math.round(100);
  const secretKey: string = config.get('secretKey');
  return CryptoJS.SHA256(nonce + secretKey).toString(CryptoJS.enc.Hex);

}
