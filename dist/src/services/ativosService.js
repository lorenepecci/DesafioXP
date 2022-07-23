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
exports.AtivosService = void 0;
require("express-async-errors");
const erroHttp_1 = require("../helpers/erroHttp");
const ativosModel_1 = require("../models/ativosModel");
const carteirasModel_1 = require("../models/carteirasModel");
class AtivosService {
    constructor(model = new ativosModel_1.AtivosModel(), carteira = new carteirasModel_1.CarteirasModel()) {
        this._model = model;
        this._modelCarteira = carteira;
    }
    create(ativo) {
        return __awaiter(this, void 0, void 0, function* () {
            const ativoCriado = yield this._model.create(ativo);
            return {
                codAtivo: ativoCriado.codAtivo,
                qtdeAtivo: ativoCriado.qtdeAtivo,
                valor: Number(ativoCriado.valorAtivo),
            };
        });
    }
    getByAssets(codAtivo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (codAtivo === 0) {
                const listaAtivos = yield this._model.getAtivosCorretora();
                const ativosComprados = listaAtivos.map((ativo) => __awaiter(this, void 0, void 0, function* () {
                    const ativoComprasLista = yield this._modelCarteira.getCarteirasAtivo(ativo.codAtivo);
                    const reduceValorCompras = ativoComprasLista.reduce((ac, a) => ac + a.qtdeAtivo, 0);
                    return Object.assign(Object.assign({}, ativo), { qtdeComprada: reduceValorCompras });
                }));
                const listaResposta = yield Promise.all(ativosComprados);
                return listaResposta;
            }
            const getAtivo = yield this._model.getByAssets(codAtivo);
            if (!getAtivo)
                throw new erroHttp_1.ErroHttp(400, 'Esse ativo não existe. ');
            const { qtdeAtivo, valorAtivo } = getAtivo;
            return { codAtivo, qtdeAtivo, valor: Number(valorAtivo) };
        });
    }
}
exports.AtivosService = AtivosService;
//# sourceMappingURL=ativosService.js.map