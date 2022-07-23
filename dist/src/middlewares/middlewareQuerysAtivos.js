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
exports.middlewareQuerysAtivos = void 0;
const erroHttp_1 = require("../helpers/erroHttp");
const middlewareQuerysAtivos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const key = Object.keys(req.query)[0];
    const value = Object.values(req.query)[0];
    if (key !== 'codCliente' && key !== 'codAtivo') {
        throw new erroHttp_1.ErroHttp(500, 'Não existe esta query para esta requisição.');
    }
    if (!value || /^[0-9]+$/.test(value) === false) {
        throw new erroHttp_1.ErroHttp(500, 'Parâmetro deve ser um numero inteiro.');
    }
    next();
});
exports.middlewareQuerysAtivos = middlewareQuerysAtivos;
//# sourceMappingURL=middlewareQuerysAtivos.js.map