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
exports.CarteirasService = void 0;
require("express-async-errors");
const ativosModel_1 = require("../models/ativosModel");
const carteirasModel_1 = require("./../models/carteirasModel");
class CarteirasService {
    constructor(model = new carteirasModel_1.CarteirasModel(), ativos = new ativosModel_1.AtivosModel()) {
        this._model = model;
        this._modelAtivo = ativos;
    }
    getClienteCarteira(codCliente) {
        return __awaiter(this, void 0, void 0, function* () {
            const carteira = yield this._model.getClienteCarteira(codCliente);
            const carteiraValor = carteira.map((ativo) => __awaiter(this, void 0, void 0, function* () {
                const objAtivo = yield this._modelAtivo.getByAssets(ativo.codAtivo);
                const valor = objAtivo === null || objAtivo === void 0 ? void 0 : objAtivo.valorAtivo;
                return Object.assign(Object.assign({}, ativo), { valor: Number(valor) });
            }));
            const listaResposta = yield Promise.all(carteiraValor);
            return listaResposta;
        });
    }
    getClienteCarteiraAtivo(codAtivo, codCliente) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.getClienteCarteiraAtivo(codAtivo, codCliente);
        });
    }
    handleCarteira(tipoCompra, codAtivo, codCliente, qtdeAtivo) {
        return __awaiter(this, void 0, void 0, function* () {
            const getClienteCarteiraAtivo = yield this._model.getClienteCarteiraAtivo(codAtivo, codCliente);
            if (tipoCompra === true) {
                if (!getClienteCarteiraAtivo) {
                    yield this._model.create({ codAtivo, codCliente, qtdeAtivo });
                }
                else {
                    const qntAtivoAtual = getClienteCarteiraAtivo.qtdeAtivo + qtdeAtivo;
                    yield this._model.update(codAtivo, codCliente, qntAtivoAtual);
                }
            }
            if (tipoCompra === false && getClienteCarteiraAtivo) {
                const qntAtivoAtual = getClienteCarteiraAtivo.qtdeAtivo - qtdeAtivo;
                if (qntAtivoAtual === 0) {
                    yield this._model.delete(codAtivo, codCliente);
                }
                yield this._model.update(codAtivo, codCliente, qntAtivoAtual);
            }
        });
    }
}
exports.CarteirasService = CarteirasService;
//# sourceMappingURL=carteirasService.js.map