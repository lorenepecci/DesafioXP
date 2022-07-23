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
exports.ExtratoService = void 0;
require("express-async-errors");
const erroHttp_1 = require("../helpers/erroHttp");
const depositoRetiradaModel_1 = require("../models/depositoRetiradaModel");
class ExtratoService {
    constructor(model = new depositoRetiradaModel_1.DepositoRetiradaModel()) {
        this._model = model;
    }
    getExtrato(codCliente, inicio, fim) {
        return __awaiter(this, void 0, void 0, function* () {
            const historicoDR = yield this._model.get(codCliente);
            if (!historicoDR) {
                throw new erroHttp_1.ErroHttp(404, 'Não existe nenhuma movimentação.');
            }
            let entradas = 0;
            let saidas = 0;
            historicoDR.forEach((historico) => {
                const dataHistorico = historico.data;
                const dataInicio = new Date(inicio);
                const dataFim = new Date(fim);
                if (dataHistorico - dataInicio > 0 && dataFim - dataHistorico > 0) {
                    if (historico.tipoDeposito === true) {
                        entradas += Number(historico.valor);
                    }
                    if (historico.tipoDeposito === false) {
                        saidas += Number(historico.valor);
                    }
                }
            });
            return { entradas, saidas };
        });
    }
}
exports.ExtratoService = ExtratoService;
//# sourceMappingURL=extratoService.js.map