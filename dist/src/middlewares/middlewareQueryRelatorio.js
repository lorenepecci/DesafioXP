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
exports.middlewareQueryRelatorio = void 0;
const erroHttp_1 = require("../helpers/erroHttp");
const middlewareQueryRelatorio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const keyCliente = Object.keys(req.query)[0];
    const keyInicio = Object.keys(req.query)[1];
    const keyFim = Object.keys(req.query)[2];
    const valueCliente = Object.values(req.query)[0];
    const valueInicio = Object.values(req.query)[1];
    const valueFim = Object.values(req.query)[2];
    if (keyCliente !== 'codCliente' ||
        keyInicio !== 'inicio' ||
        keyFim !== 'fim') {
        throw new erroHttp_1.ErroHttp(500, 'Campos incorretos ou faltantes. Os campos são codCliente, inicio e fim.');
    }
    if (/^[0-9]+$/.test(valueCliente) === false) {
        throw new erroHttp_1.ErroHttp(500, `Parâmetro deve ser um numero inteiro. `);
    }
    if (/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(valueFim) ===
        false ||
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(valueInicio) ===
            false) {
        throw new erroHttp_1.ErroHttp(500, `Parâmetro deve ter o formato aaaa-mm-dd `);
    }
    next();
});
exports.middlewareQueryRelatorio = middlewareQueryRelatorio;
//# sourceMappingURL=middlewareQueryRelatorio.js.map