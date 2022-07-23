"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareCliente = void 0;
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    nome: joi_1.default.string().min(3).required(),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    senha: joi_1.default.string().min(6).required(),
});
const middlewareCliente = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const { type, message } = error.details[0];
        switch (type) {
            case 'any.required':
                return res.status(400).json({ message });
            case 'string.base':
                return res.status(422).json({ message });
            case 'string.email':
                return res.status(422).json({ message });
            case 'string.min':
                return res.status(422).json({ message });
            default:
                return res
                    .status(500)
                    .json({ message: 'Erro no corpo da requisição.' });
        }
    }
    next();
};
exports.middlewareCliente = middlewareCliente;
//# sourceMappingURL=middlewareCliente.js.map