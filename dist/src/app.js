"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(routes_1.default);
app.use(error_middleware_1.errorHandler);
exports.default = app;
