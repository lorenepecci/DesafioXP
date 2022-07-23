"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteController_1 = require("../controllers/clienteController");
const depositoController_1 = require("../controllers/depositoController");
const retiradaController_1 = require("../controllers/retiradaController");
const middlewareDepositoRetirada_1 = require("../middlewares/middlewareDepositoRetirada");
const router = (0, express_1.Router)();
router.post('/deposito', middlewareDepositoRetirada_1.middlewareDepositoRetirada, new depositoController_1.DepositoController().create);
router.post('/saque', middlewareDepositoRetirada_1.middlewareDepositoRetirada, new retiradaController_1.RetiradaController().create);
router.get('/:codCliente', new clienteController_1.ClientesController().getSaldoCliente);
exports.default = router;
//# sourceMappingURL=depositoRetiradaRouter.js.map