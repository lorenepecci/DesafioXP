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
exports.RetiradaController = void 0;
const erroHttp_1 = require("../helpers/erroHttp");
const retiradaService_1 = require("../services/retiradaService");
const _service = new retiradaService_1.RetiradaService();
class RetiradaController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codCliente, valor } = req.body;
            const clienteLogado = JSON.parse(res.locals.payload.dataUser);
            if (clienteLogado.codCliente !== codCliente) {
                throw new erroHttp_1.ErroHttp(400, 'Conta inválida.');
            }
            const criadoRetirada = yield _service.create({
                codCliente,
                tipoDeposito: false,
                valor,
            });
            if (criadoRetirada) {
                return res
                    .status(200)
                    .json(Object.assign({ message: 'Saque feito com sucesso.' }, criadoRetirada));
            }
        });
    }
}
exports.RetiradaController = RetiradaController;
//# sourceMappingURL=retiradaController.js.map