"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteController_1 = require("../controllers/clienteController");
const middlewareCliente_1 = require("../middlewares/middlewareCliente");
const router = (0, express_1.Router)();
const clientesController = new clienteController_1.ClientesController();
router.post('/', middlewareCliente_1.middlewareCliente, clientesController.create);
exports.default = router;
//# sourceMappingURL=clientesRouter.js.map