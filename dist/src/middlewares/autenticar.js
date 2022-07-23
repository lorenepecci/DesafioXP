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
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticarMiddleware = void 0;
const autenticarToken_1 = require("../helpers/autenticarToken");
const autenticarMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        const err = { status: 401, message: 'Token não encontrado.' };
        return res.status(err.status).json({ message: err.message });
    }
    try {
        const payload = (0, autenticarToken_1.autenticarToken)(token);
        res.locals.payload = payload;
    }
    catch (_a) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
    next();
});
exports.autenticarMiddleware = autenticarMiddleware;
//# sourceMappingURL=autenticar.js.map