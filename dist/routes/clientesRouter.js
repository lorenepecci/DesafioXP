"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientesController_1 = require("../controllers/clientesController");
const router = (0, express_1.Router)();
const clientesController = new clientesController_1.ClientesController();
router.post('/', clientesController.create);
exports.default = router;
//# sourceMappingURL=clientesRouter.js.map