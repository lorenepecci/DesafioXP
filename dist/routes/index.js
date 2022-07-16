"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("./../middlewares/auth");
const ativosRouter_1 = __importDefault(require("./ativosRouter"));
const clientesRouter_1 = __importDefault(require("./clientesRouter"));
const compraVendaRouter_1 = __importDefault(require("./compraVendaRouter"));
const depositoRouter_1 = __importDefault(require("./depositoRouter"));
const loginRouter_1 = __importDefault(require("./loginRouter"));
const retiradaRouter_1 = __importDefault(require("./retiradaRouter"));
const router = (0, express_1.Router)();
exports.router = router;
router.use('/clientes', clientesRouter_1.default);
router.use('/login', loginRouter_1.default);
router.use('/conta/deposito', auth_1.authenticationMiddleware, depositoRouter_1.default);
router.use('/conta/saque', auth_1.authenticationMiddleware, retiradaRouter_1.default);
router.use('/ativos', auth_1.authenticationMiddleware, ativosRouter_1.default);
router.use('/investimentos/comprar', auth_1.authenticationMiddleware, compraVendaRouter_1.default);
//# sourceMappingURL=index.js.map