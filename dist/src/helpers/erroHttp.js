"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErroHttp = void 0;
class ErroHttp extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.ErroHttp = ErroHttp;
//# sourceMappingURL=erroHttp.js.map