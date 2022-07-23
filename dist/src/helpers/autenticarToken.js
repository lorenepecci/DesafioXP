"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticarToken = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TOKEN_SECRET = 'my-character-ultra-secure-and-ultra-long-secretXP';
const autenticarToken = (token) => {
    const validate = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
    return validate;
};
exports.autenticarToken = autenticarToken;
//# sourceMappingURL=autenticarToken.js.map