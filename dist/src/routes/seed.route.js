"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seed_controller_1 = require("../controllers/seed.controller");
const router = (0, express_1.Router)();
router.post('/v1/seed', seed_controller_1.SeedController.handleSeed);
exports.default = router;
