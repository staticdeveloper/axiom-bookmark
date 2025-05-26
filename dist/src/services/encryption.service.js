"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../config");
class EncryptionService {
    static decryptData(encryptedData) {
        const encryptedBuffer = Buffer.from(encryptedData, 'base64');
        return crypto_1.default.privateDecrypt({
            key: config_1.config.privateKey,
            padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        }, encryptedBuffer).toString('utf8');
    }
}
exports.EncryptionService = EncryptionService;
