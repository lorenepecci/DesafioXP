"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TOKEN_SECRET = 'my-character-ultra-secure-and-ultra-long-secretXP';
const jwsConfig = {
    algorithm: 'HS256',
    expiresIn: '7d',
};
const generateToken = (dataUser) => jsonwebtoken_1.default.sign({ dataUser }, TOKEN_SECRET, jwsConfig);
exports.default = generateToken;
//# sourceMappingURL=generateToken.js.map