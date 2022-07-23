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
exports.CarteirasModel = void 0;
const client_1 = require("@prisma/client");
class CarteirasModel {
    constructor(prisma = new client_1.PrismaClient()) {
        this._prisma = prisma;
    }
    create(compra) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._prisma.carteiraCliente.create({ data: compra });
        });
    }
    delete(codAtivo, codCliente) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._prisma.carteiraCliente.deleteMany({
                where: {
                    codAtivo,
                    codCliente,
                },
            });
        });
    }
    update(codAtivo, codCliente, qtdeAtivo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._prisma.carteiraCliente.updateMany({
                where: {
                    codAtivo,
                    codCliente,
                },
                data: {
                    qtdeAtivo,
                },
            });
        });
    }
    getClienteCarteiraAtivo(codAtivo, codCliente) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._prisma.carteiraCliente.findFirst({
                where: {
                    codAtivo,
                    codCliente,
                },
            });
        });
    }
    getCarteirasAtivo(codAtivo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._prisma.carteiraCliente.findMany({
                where: {
                    codAtivo,
                },
            });
        });
    }
    getClienteCarteira(codCliente) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._prisma.carteiraCliente.findMany({
                where: {
                    codCliente,
                },
                orderBy: {
                    qtdeAtivo: 'desc',
                },
                select: {
                    codCliente: true,
                    codAtivo: true,
                    qtdeAtivo: true,
                },
            });
        });
    }
}
exports.CarteirasModel = CarteirasModel;
//# sourceMappingURL=carteirasModel.js.map