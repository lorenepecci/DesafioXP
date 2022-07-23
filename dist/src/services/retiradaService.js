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
exports.RetiradaService = void 0;
const erroHttp_1 = require("../helpers/erroHttp");
const clientesModel_1 = require("../models/clientesModel");
const depositoRetiradaModel_1 = require("../models/depositoRetiradaModel");
class RetiradaService {
    constructor(model = new depositoRetiradaModel_1.DepositoRetiradaModel(), cliente = new clientesModel_1.ClientesModel()) {
        this._model = model;
        this._modelCliente = cliente;
    }
    create(retirada) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codCliente, valor } = retirada;
            const saldoCliente = yield this._modelCliente
                .getByClienteCod(codCliente)
                .then((cliente) => cliente === null || cliente === void 0 ? void 0 : cliente.saldo);
            if (Number(valor) > Number(saldoCliente)) {
                throw new erroHttp_1.ErroHttp(400, `Você não tem saldo disponível. Seu saldo é de ${saldoCliente}`);
            }
            const saldoNovoCliente = Number(saldoCliente) - Number(valor);
            yield this._modelCliente.updateSaldo(codCliente, saldoNovoCliente);
            const depositoRetiradaCriar = {
                codCliente,
                tipoDeposito: false,
                valor,
            };
            return this._model.create(depositoRetiradaCriar);
        });
    }
}
exports.RetiradaService = RetiradaService;
//# sourceMappingURL=retiradaService.js.map