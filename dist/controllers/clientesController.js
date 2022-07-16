"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesController = void 0;
const clientesService_1 = require("../services/clientesService");
const _service = new clientesService_1.ClientesService();
class ClientesController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, saldo } = req.body;
            const clientPost = yield _service.create({ name, email, password, saldo });
            return res.status(200).json(clientPost);
        });
    }
}
exports.ClientesController = ClientesController;
//# sourceMappingURL=clientesController.js.map