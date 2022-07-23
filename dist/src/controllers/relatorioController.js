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
exports.RelatorioController = void 0;
const erroHttp_1 = require("../helpers/erroHttp");
const relatorioService_1 = require("../services/relatorioService");
const _service = new relatorioService_1.RelatorioService();
class RelatorioController {
    getRelatorio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codCliente, inicio, fim } = req.query;
            const clienteLogado = JSON.parse(res.locals.payload.dataUser);
            const codClienteLogado = clienteLogado.codCliente;
            if (Number(codCliente) !== codClienteLogado) {
                throw new erroHttp_1.ErroHttp(400, 'Ação nao permitida. Código do usuário incorreto.');
            }
            if (typeof inicio === 'string' && typeof fim === 'string') {
                const relatorio = yield _service.getRelatorio(Number(codCliente), inicio, fim);
                return res.status(200).json(relatorio);
            }
        });
    }
}
exports.RelatorioController = RelatorioController;
//# sourceMappingURL=relatorioController.js.map