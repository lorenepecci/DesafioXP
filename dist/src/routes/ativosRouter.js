"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ativoController_1 = require("../controllers/ativoController");
const middlewareAtivo_1 = require("../middlewares/middlewareAtivo");
const middlewareQuerysAtivos_1 = require("../middlewares/middlewareQuerysAtivos");
const router = (0, express_1.Router)();
const ativosController = new ativoController_1.AtivosController();
router.post('/', middlewareAtivo_1.middlewareAtivo, ativosController.create);
router.get('/', middlewareQuerysAtivos_1.middlewareQuerysAtivos, ativosController.getAssetsOuCliente);
exports.default = router;
//# sourceMappingURL=ativosRouter.js.map