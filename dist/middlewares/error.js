"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const erroHttp = (err, _req, res, next) => {
    const { status, message } = err;
    res.status(status || 500).json({ message });
    next();
};
exports.default = erroHttp;
//# sourceMappingURL=error.js.map