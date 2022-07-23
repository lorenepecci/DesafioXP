"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const relatorioController_1 = require("../controllers/relatorioController");
const vendaController_1 = require("../controllers/vendaController");
const middlewareCompraVenda_1 = require("../middlewares/middlewareCompraVenda");
const middlewareQueryRelatorio_1 = require("../middlewares/middlewareQueryRelatorio");
const compraController_1 = require("../controllers/compraController");
const router = (0, express_1.Router)();
const comprarController = new compraController_1.CompraController();
const venderController = new vendaController_1.VendaController();
const relatorioController = new relatorioController_1.RelatorioController();
router.post('/comprar', middlewareCompraVenda_1.middlewareCompraVenda, comprarController.create);
router.post('/vender', middlewareCompraVenda_1.middlewareCompraVenda, venderController.create);
router.get('/relatorio', middlewareQueryRelatorio_1.middlewareQueryRelatorio, relatorioController.getRelatorio);
exports.default = router;
//# sourceMappingURL=InvestimentosRouter.js.map