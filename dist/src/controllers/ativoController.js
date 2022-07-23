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
exports.AtivosController = void 0;
const erroHttp_1 = require("../helpers/erroHttp");
const ativosService_1 = require("../services/ativosService");
const carteirasService_1 = require("../services/carteirasService");
const _service = new ativosService_1.AtivosService();
const _serviceCarteira = new carteirasService_1.CarteirasService();
class AtivosController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { qtdeAtivo, valorAtivo } = req.body;
            const ativoCriado = yield _service.create({
                qtdeAtivo,
                valorAtivo,
            });
            return res.status(200).json(ativoCriado);
        });
    }
    getAssetsOuCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codAtivo, codCliente } = req.query;
            if (codAtivo) {
                const getAtivo = yield _service.getByAssets(Number(codAtivo));
                return res.status(200).json(getAtivo);
            }
            if (codCliente) {
                const clienteLogado = JSON.parse(res.locals.payload.dataUser);
                const codClienteLogado = clienteLogado.codCliente;
                if (codCliente != codClienteLogado) {
                    throw new erroHttp_1.ErroHttp(400, 'Ação nao permitida. Código do usuário incorreto.');
                }
                const listaCarteira = yield _serviceCarteira.getClienteCarteira(Number(codCliente));
                return res.status(200).json(listaCarteira);
            }
        });
    }
}
exports.AtivosController = AtivosController;
//# sourceMappingURL=ativoController.js.map