"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const web3_js_1 = require("@solana/web3.js");
const bip39 = __importStar(require("bip39"));
const ed25519 = __importStar(require("ed25519-hd-key"));
const tweetnacl_1 = __importDefault(require("tweetnacl"));
class WalletService {
    static validateMnemonic(mnemonic) {
        if (!bip39.validateMnemonic(mnemonic)) {
            throw new Error('Invalid mnemonic phrase');
        }
    }
    static deriveKeypair(mnemonic) {
        this.validateMnemonic(mnemonic);
        const seed = bip39.mnemonicToSeedSync(mnemonic).slice(0, 32);
        const { key } = ed25519.derivePath(`m/44'/501'/0'/0'`, seed.toString('hex'));
        return web3_js_1.Keypair.fromSecretKey(tweetnacl_1.default.sign.keyPair.fromSeed(new Uint8Array(key)).secretKey);
    }
}
exports.WalletService = WalletService;
