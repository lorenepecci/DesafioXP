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
exports.DepositoService = void 0;
const erroHttp_1 = require("../helpers/erroHttp");
const clientesModel_1 = require("../models/clientesModel");
const depositoRetiradaModel_1 = require("../models/depositoRetiradaModel");
class DepositoService {
    constructor(model = new depositoRetiradaModel_1.DepositoRetiradaModel(), cliente = new clientesModel_1.ClientesModel()) {
        this._model = model;
        this._modelCliente = cliente;
    }
    create(codClienteLogado, deposito) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codCliente, valor } = deposito;
            const saldoClienteLogado = yield this._modelCliente
                .getByClienteCod(codClienteLogado)
                .then((cliente) => cliente === null || cliente === void 0 ? void 0 : cliente.saldo);
            const saldoCliente = yield this._modelCliente
                .getByClienteCod(codCliente)
                .then((cliente) => cliente === null || cliente === void 0 ? void 0 : cliente.saldo);
            if (codClienteLogado !== codCliente) {
                if (Number(valor) > Number(saldoClienteLogado)) {
                    throw new erroHttp_1.ErroHttp(400, `Você não tem saldo disponível. Seu saldo é de ${saldoClienteLogado}`);
                }
                if (!saldoCliente) {
                    throw new erroHttp_1.ErroHttp(400, 'Esse cliente não existe.');
                }
                const saldoNovoClienteLogado = Number(saldoClienteLogado) - Number(valor);
                const saldoNovoCliente = Number(saldoCliente) + Number(valor);
                yield this._modelCliente.updateSaldo(codClienteLogado, saldoNovoClienteLogado);
                yield this._modelCliente.updateSaldo(codCliente, saldoNovoCliente);
            }
            else {
                const saldoNovoCliente = Number(saldoCliente) + Number(valor);
                yield this._modelCliente.updateSaldo(codCliente, saldoNovoCliente);
            }
            const depositoRetiradaCriar = {
                codCliente: codClienteLogado,
                tipoDeposito: true,
                valor,
            };
            return this._model.create(depositoRetiradaCriar);
        });
    }
}
exports.DepositoService = DepositoService;
//# sourceMappingURL=depositoService.js.map