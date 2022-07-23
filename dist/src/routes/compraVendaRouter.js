"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendaController_1 = require("../controllers/vendaController");
const middlewareCompraVenda_1 = require("../middlewares/middlewareCompraVenda");
const compraController_1 = require("./../controllers/compraController");
const router = (0, express_1.Router)();
const comprarController = new compraController_1.CompraController();
const venderController = new vendaController_1.VendaController();
router.post('/comprar', middlewareCompraVenda_1.middlewareCompraVenda, comprarController.create);
router.post('/vender', middlewareCompraVenda_1.middlewareCompraVenda, venderController.create);
exports.default = router;
//# sourceMappingURL=compraVendaRouter.js.map