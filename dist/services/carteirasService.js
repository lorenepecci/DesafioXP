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
const carteirasModel_1 = require("./../models/carteirasModel");
class CarteirasService {
    constructor(model = new carteirasModel_1.CarteirasModel()) {
        this._model = model;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            //throw error codAtivo nao existe.
        });
    }
    handleCarteira(carteira) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codCliente, codAtivo, qtdeAtivo, valor, compra } = carteira;
            const findOne = yield this._model.getOne(codAtivo, codCliente);
            if (findOne) {
                if (qtdeAtivo > findOne.qtdeAtivo) {
                    if (compra === false)
                        return "erro vc n tem quantidade suficiente desse ativo";
                    // if compra===true e valor*qtde > saldo vc nao tem dn o suficiente
                    // sucesso - diminua do saldo da conta e faça um update da quantidade de ativo e valor
                }
                else if (qtdeAtivo < findOne.qtdeAtivo) {
                    if (compra === true) {
                        //veja se tem saldo suficiente valor*qtde > saldo "erro vc nao tem", "sucesso e diminua.."
                        //if compra===false sucesso aumente valor*qntd no seu saldo e retire a quantidade do ativo
                    }
                }
                else if (qtdeAtivo === findOne.qtdeAtivo) {
                    // vc tem q comparar por valor*quant .. nao adianta só o tanto 
                }
            }
        });
    }
}
exports.CarteirasService = CarteirasService;
//# sourceMappingURL=carteirasService.js.map