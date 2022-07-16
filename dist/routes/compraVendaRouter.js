"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compraVenda_1 = require("../controllers/compraVenda");
const router = (0, express_1.Router)();
const compraVendaController = new compraVenda_1.CompraVendaController();
router.post('/', compraVendaController.create);
exports.default = router;
//# sourceMappingURL=compraVendaRouter.js.map