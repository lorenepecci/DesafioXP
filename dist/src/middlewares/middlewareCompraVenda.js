"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareCompraVenda = void 0;
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    codCliente: joi_1.default.number().integer().required(),
    codAtivo: joi_1.default.number().integer().required(),
    qtdeAtivo: joi_1.default.number().integer().min(1).required(),
});
const middlewareCompraVenda = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const { type, message } = error.details[0];
        switch (type) {
            case 'any.required':
                return res.status(400).json({ message });
            case 'number.integer':
                return res.status(422).json({ message });
            case 'number.min':
                return res.status(422).json({ message });
            case 'string.base':
                return res.status(422).json({ message });
            default:
                break;
        }
    }
    next();
};
exports.middlewareCompraVenda = middlewareCompraVenda;
//# sourceMappingURL=middlewareCompraVenda.js.map