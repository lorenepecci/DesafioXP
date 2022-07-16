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
exports.CompraVendaController = void 0;
const compraVendaService_1 = require("../services/compraVendaService");
const _service = new compraVendaService_1.CompraVendaService();
class CompraVendaController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codAtivo, qtdeAtivo } = req.body;
            const clienteLogged = JSON.parse(res.locals.payload.dataUser);
            const { codCliente } = clienteLogged;
            if (codCliente) {
                const compraVendaCreated = yield _service.create({
                    codAtivo,
                    qtdeAtivo,
                    compra: true,
                    codCliente,
                });
                return res.status(200).json(compraVendaCreated);
            }
        });
    }
}
exports.CompraVendaController = CompraVendaController;
//# sourceMappingURL=compraVenda.js.map