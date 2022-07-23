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
exports.CompraService = void 0;
const runtime_1 = require("@prisma/client/runtime");
require("express-async-errors");
const erroHttp_1 = require("../helpers/erroHttp");
const ativosModel_1 = require("../models/ativosModel");
const clientesModel_1 = require("../models/clientesModel");
const compraVendaModel_1 = require("../models/compraVendaModel");
const carteirasService_1 = require("./../services/carteirasService");
class CompraService {
    constructor(model = new compraVendaModel_1.CompraVendaModel(), ativo = new ativosModel_1.AtivosModel(), carteira = new carteirasService_1.CarteirasService(), cliente = new clientesModel_1.ClientesModel()) {
        this._model = model;
        this._modelAtivo = ativo;
        this._serviceCarteira = carteira;
        this._modelCliente = cliente;
    }
    create(compra) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codCliente, codAtivo, qtdeAtivo, tipoCompra } = compra;
            const encontrarAtivo = yield this._modelAtivo.getByAssets(compra.codAtivo);
            const encontrarCliente = yield this._modelCliente.getByClienteCod(codCliente);
            if (!encontrarAtivo) {
                throw new erroHttp_1.ErroHttp(401, 'Este Ativo não existe.');
            }
            if (encontrarAtivo.qtdeAtivo < qtdeAtivo) {
                throw new erroHttp_1.ErroHttp(400, 'Essa quantidade é maior que a quantidade disponível na corretora');
            }
            const saldoCliente = encontrarCliente === null || encontrarCliente === void 0 ? void 0 : encontrarCliente.saldo;
            const valorCompra = Number(encontrarAtivo.valorAtivo) * Number(qtdeAtivo);
            if (valorCompra > Number(saldoCliente)) {
                throw new erroHttp_1.ErroHttp(400, 'Não há saldo disponível para esta compra.');
            }
            const saldoAtual = Number(saldoCliente) - valorCompra;
            yield this._modelCliente.updateSaldo(codCliente, saldoAtual);
            yield this._serviceCarteira.handleCarteira(tipoCompra, codAtivo, codCliente, qtdeAtivo);
            const quantidadeAtualAtivo = Number(encontrarAtivo.qtdeAtivo) - qtdeAtivo;
            yield this._modelAtivo.updateQuantidadeAtivo(codAtivo, quantidadeAtualAtivo);
            return yield this._model.create(Object.assign(Object.assign({}, compra), { valor: new runtime_1.Decimal(encontrarAtivo.valorAtivo) }));
        });
    }
}
exports.CompraService = CompraService;
//# sourceMappingURL=compraService.js.map