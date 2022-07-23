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
exports.ExtratoController = void 0;
const erroHttp_1 = require("../helpers/erroHttp");
const extratoService_1 = require("../services/extratoService");
const _service = new extratoService_1.ExtratoService();
class ExtratoController {
    getExtrato(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codCliente, inicio, fim } = req.query;
            const clienteLogado = JSON.parse(res.locals.payload.dataUser);
            const codClienteLogado = clienteLogado.codCliente;
            if (Number(codCliente) !== codClienteLogado) {
                throw new erroHttp_1.ErroHttp(400, 'Ação nao permitida. Código do usuário incorreto.');
            }
            if (typeof inicio === 'string' && typeof fim === 'string') {
                const extrato = yield _service.getExtrato(Number(codCliente), inicio, fim);
                return res.status(200).json(extrato);
            }
        });
    }
}
exports.ExtratoController = ExtratoController;
//# sourceMappingURL=extratoController.js.map