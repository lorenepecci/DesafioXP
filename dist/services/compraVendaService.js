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
exports.CompraVendaService = void 0;
require("express-async-errors");
const ativosModel_1 = require("../models/ativosModel");
const compraVendaModel_1 = require("../models/compraVendaModel");
const carteirasService_1 = require("./../services/carteirasService");
class CompraVendaService {
    constructor(model = new compraVendaModel_1.CompraVendaModel(), ativo = new ativosModel_1.AtivosModel(), carteira = new carteirasService_1.CarteirasService()) {
        this._model = model;
        this._modelAtivo = ativo;
        this._serviceCarteira = carteira;
    }
    create(compraVenda) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codCliente, codAtivo, qtdeAtivo, compra } = compraVenda;
            const findValorAtivo = yield this._modelAtivo.getByAssets(compraVenda.codAtivo);
            if (findValorAtivo) {
                yield this._serviceCarteira.handleCarteira({
                    codCliente,
                    codAtivo,
                    qtdeAtivo,
                    compra,
                    valor: findValorAtivo.valorAtivo,
                });
                return yield this._model.create(Object.assign(Object.assign({}, compraVenda), { valor: findValorAtivo.valorAtivo }));
            }
            //throw error codAtivo nao existe.
        });
    }
}
exports.CompraVendaService = CompraVendaService;
//# sourceMappingURL=compraVendaService.js.map