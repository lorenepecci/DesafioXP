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
exports.VendaController = void 0;
const erroHttp_1 = require("../helpers/erroHttp");
const vendaService_1 = require("../services/vendaService");
const _service = new vendaService_1.VendaService();
class VendaController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codCliente, codAtivo, qtdeAtivo } = req.body;
            const clienteLogado = JSON.parse(res.locals.payload.dataUser);
            const codClienteLogado = clienteLogado.codCliente;
            if (codCliente !== codClienteLogado) {
                throw new erroHttp_1.ErroHttp(400, 'Ação nao permitida. Código do usuário incorreto.');
            }
            const vendaCriada = yield _service.create({
                codAtivo,
                qtdeAtivo,
                tipoCompra: false,
                codCliente,
            });
            if (vendaCriada) {
                return res.status(200).json(Object.assign({ message: 'Venda feita com sucesso.' }, vendaCriada));
            }
        });
    }
}
exports.VendaController = VendaController;
//# sourceMappingURL=vendaController.js.map