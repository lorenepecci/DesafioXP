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
exports.ClientesModel = void 0;
const client_1 = require("@prisma/client");
const runtime_1 = require("@prisma/client/runtime");
class ClientesModel {
    constructor(prisma = new client_1.PrismaClient()) {
        this._prisma = prisma;
    }
    create(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._prisma.cliente.create({ data: cliente });
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._prisma.cliente.findUnique({ where: { email } });
        });
    }
    getByClienteCod(codCliente) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._prisma.cliente.findUnique({ where: { codCliente } });
        });
    }
    updateSaldo(codCliente, saldo) {
        return __awaiter(this, void 0, void 0, function* () {
            var teste = new runtime_1.Decimal(saldo);
            return this._prisma.cliente.update({
                where: {
                    codCliente,
                },
                data: {
                    saldo: new runtime_1.Decimal(saldo),
                },
            });
        });
    }
}
exports.ClientesModel = ClientesModel;
//# sourceMappingURL=clientesModel.js.map