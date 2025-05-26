"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
require("solders");
const seed_route_1 = __importDefault(require("./seed.route"));
const verify_route_1 = __importDefault(require("./verify.route"));
const router = (0, express_1.Router)();
router.use('/', seed_route_1.default);
router.use('/', verify_route_1.default);
exports.default = router;
