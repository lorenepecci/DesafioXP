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
exports.AtivosController = void 0;
const ativosService_1 = require("../services/ativosService");
const _service = new ativosService_1.AtivosService();
class AtivosController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codAtivo, qtdeAtivo, valorAtivo } = req.body;
            const ativoCreated = yield _service.create({
                qtdeAtivo,
                valorAtivo,
            });
            return res.status(200).json(ativoCreated);
        });
    }
    getByAssets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cod } = req.params;
            const getAtivo = yield _service.getByAssets(cod);
            return res.status(200).json(getAtivo);
        });
    }
}
exports.AtivosController = AtivosController;
//# sourceMappingURL=ativosController.js.map