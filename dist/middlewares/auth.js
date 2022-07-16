"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
const authenticateToken_1 = __importDefault(require("../helpers/authenticateToken"));
const authenticationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        const err = { status: 401, message: 'Token not found' };
        return res.status(err.status).json({ message: err.message });
    }
    try {
        const payload = yield (0, authenticateToken_1.default)(token);
        res.locals.payload = payload;
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    next();
});
exports.authenticationMiddleware = authenticationMiddleware;
//# sourceMappingURL=auth.js.map