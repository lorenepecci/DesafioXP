"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
const middlewareLogin_1 = require("../middlewares/middlewareLogin");
const router = (0, express_1.Router)();
const loginController = new loginController_1.LoginController();
router.post('/', middlewareLogin_1.middlewareLogin, loginController.create);
exports.default = router;
//# sourceMappingURL=loginRouter.js.map