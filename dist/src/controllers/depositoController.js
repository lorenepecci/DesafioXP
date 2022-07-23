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
exports.DepositoController = void 0;
const depositoService_1 = require("../services/depositoService");
const _service = new depositoService_1.DepositoService();
class DepositoController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codCliente, valor } = req.body;
            const clienteLogado = JSON.parse(res.locals.payload.dataUser);
            const criadoDeposito = yield _service.create(clienteLogado.codCliente, {
                codCliente,
                tipoDeposito: true,
                valor,
            });
            if (criadoDeposito) {
                return res.status(200).json(Object.assign({ message: 'Depósito feito com sucesso.' }, criadoDeposito));
            }
        });
    }
}
exports.DepositoController = DepositoController;
//# sourceMappingURL=depositoController.js.map