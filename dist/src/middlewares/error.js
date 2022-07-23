"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareErro = void 0;
const middlewareErro = (erro, _req, res, next) => {
    const { status, message } = erro;
    res.status(status || 500).json({ message });
    next();
};
exports.middlewareErro = middlewareErro;
//# sourceMappingURL=error.js.map