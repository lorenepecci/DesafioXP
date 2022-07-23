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
exports.VendaService = void 0;
const runtime_1 = require("@prisma/client/runtime");
require("express-async-errors");
const erroHttp_1 = require("../helpers/erroHttp");
const ativosModel_1 = require("../models/ativosModel");
const clientesModel_1 = require("../models/clientesModel");
const compraVendaModel_1 = require("../models/compraVendaModel");
const carteirasService_1 = require("./../services/carteirasService");
class VendaService {
    constructor(model = new compraVendaModel_1.CompraVendaModel(), ativo = new ativosModel_1.AtivosModel(), carteira = new carteirasService_1.CarteirasService(), cliente = new clientesModel_1.ClientesModel()) {
        this._model = model;
        this._modelAtivo = ativo;
        this._serviceCarteira = carteira;
        this._modelCliente = cliente;
    }
    create(venda) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codCliente, codAtivo, qtdeAtivo, tipoCompra } = venda;
            const encontrarAtivo = yield this._modelAtivo.getByAssets(venda.codAtivo);
            const encontrarCliente = yield this._modelCliente.getByClienteCod(codCliente);
            const getCarteiraCliente = yield this._serviceCarteira.getClienteCarteiraAtivo(codAtivo, codCliente);
            if (!encontrarAtivo) {
                throw new erroHttp_1.ErroHttp(401, 'Este Ativo não existe.');
            }
            if (!getCarteiraCliente) {
                throw new erroHttp_1.ErroHttp(401, 'Esse item na carteira não existe.');
            }
            if (getCarteiraCliente.qtdeAtivo < qtdeAtivo) {
                throw new erroHttp_1.ErroHttp(400, 'Essa quantidade é maior que a quantidade disponível na carteira.');
            }
            const saldoCliente = encontrarCliente === null || encontrarCliente === void 0 ? void 0 : encontrarCliente.saldo;
            const valorVenda = Number(encontrarAtivo.valorAtivo) * Number(qtdeAtivo);
            const saldoAtual = Number(saldoCliente) + valorVenda;
            yield this._modelCliente.updateSaldo(codCliente, saldoAtual);
            yield this._serviceCarteira.handleCarteira(tipoCompra, codAtivo, codCliente, qtdeAtivo);
            const quantidadeAtualAtivo = Number(encontrarAtivo.qtdeAtivo) + qtdeAtivo;
            yield this._modelAtivo.updateQuantidadeAtivo(codAtivo, quantidadeAtualAtivo);
            return this._model.create(Object.assign(Object.assign({}, venda), { valor: new runtime_1.Decimal(encontrarAtivo.valorAtivo) }));
        });
    }
}
exports.VendaService = VendaService;
//# sourceMappingURL=vendaService.js.map