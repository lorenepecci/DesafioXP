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
exports.ClientesController = void 0;
const criptografarSenhas_1 = require("../helpers/criptografarSenhas");
const erroHttp_1 = require("../helpers/erroHttp");
const clientesService_1 = require("../services/clientesService");
const _service = new clientesService_1.ClientesService();
class ClientesController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email, senha } = req.body;
            const senhaCriptografada = yield criptografarSenhas_1.CriptografarSenhas.criptografar(senha);
            const clientePostado = yield _service.create({
                nome,
                email,
                senha: senhaCriptografada,
            });
            return res.status(200).json(clientePostado);
        });
    }
    getSaldoCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codCliente } = req.params;
            const clienteLogado = JSON.parse(res.locals.payload.dataUser);
            const codClienteLogado = clienteLogado.codCliente;
            console.log(codCliente, codClienteLogado);
            if (codClienteLogado !== Number(codCliente)) {
                throw new erroHttp_1.ErroHttp(400, 'Ação nao permitida. Código do usuário incorreto.');
            }
            const getSaldoCliente = yield _service.getSaldoCliente(Number(codCliente));
            return res
                .status(200)
                .json({ codCliente: Number(codCliente), saldo: Number(getSaldoCliente) });
        });
    }
}
exports.ClientesController = ClientesController;
//# sourceMappingURL=clienteController.js.map