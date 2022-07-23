"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ativoController_1 = require("../controllers/ativoController");
const autenticar_1 = require("../middlewares/autenticar");
const middlewareAtivo_1 = require("../middlewares/middlewareAtivo");
const middlewareQuerysAtivos_1 = require("../middlewares/middlewareQuerysAtivos");
const router = (0, express_1.Router)();
const ativosController = new ativoController_1.AtivosController();
router.post('/', autenticar_1.autenticarMiddleware, middlewareAtivo_1.middlewareAtivo, ativosController.create);
router.get('/', autenticar_1.autenticarMiddleware, middlewareQuerysAtivos_1.middlewareQuerysAtivos, ativosController.getAssetsOuCliente);
router.get('/corretora', ativosController.getAtivosCorretora);
exports.default = router;
//# sourceMappingURL=ativosRouter.js.map