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
exports.ClientesService = void 0;
require("express-async-errors");
const erroHttp_1 = require("../helpers/erroHttp");
const clientesModel_1 = require("../models/clientesModel");
class ClientesService {
    constructor(model = new clientesModel_1.ClientesModel()) {
        this._model = model;
    }
    create(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontraCliente = yield this._model.getByEmail(cliente.email);
            if (encontraCliente) {
                throw new erroHttp_1.ErroHttp(400, 'Este usuário já foi cadastrado.');
            }
            return this._model.create(cliente);
        });
    }
    getSaldoCliente(codCliente) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontraCliente = yield this._model.getByClienteCod(codCliente);
            if (!encontraCliente) {
                throw new erroHttp_1.ErroHttp(400, 'Este usuário não foi cadastrado.');
            }
            return encontraCliente.saldo;
        });
    }
}
exports.ClientesService = ClientesService;
//# sourceMappingURL=clientesService.js.map