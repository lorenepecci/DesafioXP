"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ativosController_1 = require("../controllers/ativosController");
const clientesController_1 = require("../controllers/clientesController");
const router = (0, express_1.Router)();
const ativosController = new ativosController_1.AtivosController();
const clientesController = new clientesController_1.ClientesController();
router.post('/', ativosController.create);
router.get('/:cod', ativosController.getByAssets);
/* router.get('/:cliente', clientesController.getByClienteAtivos); */
exports.default = router;
//# sourceMappingURL=ativosRouter.js.map