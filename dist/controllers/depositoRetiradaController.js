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
exports.DepositoRetiradaController = void 0;
const depositoRetiradaService_1 = require("../services/depositoRetiradaService");
const _service = new depositoRetiradaService_1.DepositoRetiradaService();
class DepositoRetiradaController {
    constructor(isDeposito) {
        this._isDeposito = isDeposito;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { valor } = req.body;
            const clienteLogado = JSON.parse(res.locals.payload.dataUser);
            const { codCliente } = clienteLogado;
            if (codCliente) {
                const criadoDeposito = yield _service.create({
                    codCliente,
                    deposito: true,
                    valor,
                });
                return res.status(200).json(criadoDeposito);
            }
        });
    }
}
exports.DepositoRetiradaController = DepositoRetiradaController;
//# sourceMappingURL=depositoRetiradaController.js.map