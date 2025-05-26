"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        error: 'internal',
        message: err.message
    });
}
