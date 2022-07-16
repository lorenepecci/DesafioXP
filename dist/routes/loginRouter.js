"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
const router = (0, express_1.Router)();
const loginController = new loginController_1.LoginController();
router.post('/', loginController.create);
exports.default = router;
//# sourceMappingURL=loginRouter.js.map