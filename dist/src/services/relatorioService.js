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
exports.RelatorioService = void 0;
require("express-async-errors");
const erroHttp_1 = require("../helpers/erroHttp");
const compraVendaModel_1 = require("../models/compraVendaModel");
class RelatorioService {
    constructor(model = new compraVendaModel_1.CompraVendaModel()) {
        this._model = model;
    }
    getRelatorio(codCliente, inicio, fim) {
        return __awaiter(this, void 0, void 0, function* () {
            const historicoCV = (yield this._model.get(codCliente));
            const listaRelatorio = [];
            if (!historicoCV) {
                throw new erroHttp_1.ErroHttp(404, 'Não existe histórico.');
            }
            historicoCV.forEach((historico) => {
                var _a, _b, _c;
                const dataHistorico = historico.data;
                const dataInicio = new Date(inicio);
                const dataFim = new Date(fim);
                if (dataHistorico - dataInicio > 0 && dataFim - dataHistorico > 0) {
                    listaRelatorio.push({
                        codAtivo: historico.codAtivo,
                        total: historico.qtdeAtivo * Number(historico.valor),
                        tipoCompra: historico.tipoCompra,
                        data: ((_a = historico.data) === null || _a === void 0 ? void 0 : _a.getDate()) +
                            '/' +
                            ((_b = historico.data) === null || _b === void 0 ? void 0 : _b.getMonth()) +
                            '/' +
                            ((_c = historico.data) === null || _c === void 0 ? void 0 : _c.getFullYear()),
                    });
                }
            });
            return listaRelatorio;
        });
    }
}
exports.RelatorioService = RelatorioService;
//# sourceMappingURL=relatorioService.js.map