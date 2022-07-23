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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
require("express-async-errors");
const criptografarSenhas_1 = require("../helpers/criptografarSenhas");
const erroHttp_1 = require("../helpers/erroHttp");
const gerarToken_1 = __importDefault(require("../helpers/gerarToken"));
const clientesModel_1 = require("../models/clientesModel");
class LoginService {
    constructor(model = new clientesModel_1.ClientesModel()) {
        this._model = model;
    }
    create(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            const getCliente = yield this._model.getByEmail(cliente.email);
            if (getCliente) {
                const descriptografarSenhaBD = yield criptografarSenhas_1.CriptografarSenhas.comparar(cliente.senha, getCliente.senha);
                if (descriptografarSenhaBD) {
                    const token = (0, gerarToken_1.default)(JSON.stringify(getCliente));
                    return { token, codCliente: getCliente.codCliente };
                }
            }
            throw new erroHttp_1.ErroHttp(401, 'Email ou senha inválida.');
        });
    }
}
exports.LoginService = LoginService;
//# sourceMappingURL=loginService.js.map