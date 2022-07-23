"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const autenticar_1 = require("../middlewares/autenticar");
const ativosRouter_1 = __importDefault(require("./ativosRouter"));
const clientesRouter_1 = __importDefault(require("./clientesRouter"));
const contaRouter_1 = __importDefault(require("./contaRouter"));
const InvestimentosRouter_1 = __importDefault(require("./InvestimentosRouter"));
const loginRouter_1 = __importDefault(require("./loginRouter"));
const router = (0, express_1.Router)();
exports.router = router;
router.use('/clientes', clientesRouter_1.default);
router.use('/login', loginRouter_1.default);
router.use('/conta', autenticar_1.autenticarMiddleware, contaRouter_1.default);
router.use('/ativos', ativosRouter_1.default);
router.use('/investimentos', autenticar_1.autenticarMiddleware, InvestimentosRouter_1.default);
//# sourceMappingURL=index.js.map