"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareDepositoRetirada = void 0;
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    codCliente: joi_1.default.number().integer().required(),
    valor: joi_1.default.number().min(1).required(),
});
const middlewareDepositoRetirada = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const { type, message } = error.details[0];
        switch (type) {
            case 'any.required':
                return res.status(400).json({ message });
            case 'number.base':
                return res.status(422).json({ message });
            case 'number.integer':
                return res.status(422).json({ message });
            case 'number.min':
                return res.status(422).json({ message });
            default:
                return res
                    .status(500)
                    .json({ message: 'Erro no corpo da requisição.' });
        }
    }
    next();
};
exports.middlewareDepositoRetirada = middlewareDepositoRetirada;
//# sourceMappingURL=middlewareDepositoRetirada.js.map