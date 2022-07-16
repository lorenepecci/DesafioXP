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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositoRetiradaService = void 0;
const errorClass_1 = __importDefault(require("../helpers/errorClass"));
const clientesModel_1 = require("../models/clientesModel");
const depositoRetiradaModel_1 = require("../models/depositoRetiradaModel");
class DepositoRetiradaService {
    constructor(model = new depositoRetiradaModel_1.DepositoRetiradaModel(), cliente = new clientesModel_1.ClientesModel()) {
        this._model = model;
        this._modelCliente = cliente;
    }
    create(depositoRetirada) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codCliente, valor, deposito } = depositoRetirada;
            const saldoCliente = (yield this._modelCliente
                .getByClienteCod(codCliente)
                .then((cliente) => cliente === null || cliente === void 0 ? void 0 : cliente.saldo));
            if (saldoCliente) {
                let saldoNovo;
                if (deposito === false) {
                    if (Number(valor) > saldoCliente) {
                        throw new errorClass_1.default(400, `Você não tem saldo disponível. Seu saldo é de ${saldoCliente}`);
                    }
                    saldoNovo = saldoCliente - Number(valor);
                    const updateSaldo = yield this._modelCliente.updateSaldo(codCliente, saldoNovo);
                }
                else if (deposito === true) {
                    saldoNovo = saldoCliente + Number(valor);
                    const updateSaldo = yield this._modelCliente.updateSaldo(codCliente, saldoNovo);
                    console.log(updateSaldo, 'uppppppp');
                }
            }
            return this._model.create(depositoRetirada);
        });
    }
}
exports.DepositoRetiradaService = DepositoRetiradaService;
//# sourceMappingURL=depositoRetiradaService.js.map