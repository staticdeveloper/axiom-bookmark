import { Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';
import * as ed25519 from 'ed25519-hd-key';
import nacl from 'tweetnacl';

export class WalletService {
  static validateMnemonic(mnemonic: string): void {
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error('Invalid mnemonic phrase');
    }
  }

  static deriveKeypair(mnemonic: string): Keypair {
    this.validateMnemonic(mnemonic);
    const seed = bip39.mnemonicToSeedSync(mnemonic).slice(0, 32);
    const { key } = ed25519.derivePath(`m/44'/501'/0'/0'`, seed.toString('hex'));
    return Keypair.fromSecretKey(nacl.sign.keyPair.fromSeed(new Uint8Array(key)).secretKey);
  }
}