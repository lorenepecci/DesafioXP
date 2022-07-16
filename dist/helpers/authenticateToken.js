"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorClass_1 = __importDefault(require("./errorClass"));
const TOKEN_SECRET = 'my-character-ultra-secure-and-ultra-long-secretXP';
const authenticateToken = (token) => {
    try {
        const validate = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
        return validate;
    }
    catch (err) {
        throw new errorClass_1.default(500, 'token problem!');
    }
};
exports.default = authenticateToken;
//# sourceMappingURL=authenticateToken.js.map