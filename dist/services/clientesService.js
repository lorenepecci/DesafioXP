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
exports.ClientesService = void 0;
require("express-async-errors");
const errorClass_1 = __importDefault(require("../helpers/errorClass"));
const clientesModel_1 = require("../models/clientesModel");
class ClientesService {
    constructor(model = new clientesModel_1.ClientesModel()) {
        this._model = model;
    }
    create(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            const findClient = yield this._model.getByEmail(cliente.email);
            if (findClient) {
                throw new errorClass_1.default(400, 'Este usuário já foi cadastrado.');
            }
            return this._model.create(cliente);
        });
    }
}
exports.ClientesService = ClientesService;
//# sourceMappingURL=clientesService.js.map