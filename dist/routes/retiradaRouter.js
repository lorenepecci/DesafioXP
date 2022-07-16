"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const depositoRetiradaController_1 = require("../controllers/depositoRetiradaController");
const router = (0, express_1.Router)();
router.post('/', new depositoRetiradaController_1.DepositoRetiradaController(false).create);
exports.default = router;
//# sourceMappingURL=retiradaRouter.js.map