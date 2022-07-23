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
const runtime_1 = require("@prisma/client/runtime");
const chai_1 = require("chai");
const ativosModel_1 = require("../../../models/ativosModel");
const ativosService_1 = require("../../../services/ativosService");
describe('--- Testes no MODEL ativos ---', () => {
    const model = new ativosModel_1.AtivosModel();
    const service = new ativosService_1.AtivosService();
    describe('Testando a função create', () => {
        /*    beforeEach(() => {
          const ativoCriado = {
            codAtivo: 5,
            qtdeAtivo: 2,
            valorAtivo: new Decimal(10),
          };
          sinon.stub(model, 'create').resolves(ativoCriado);
        });
    
        afterEach(() => {
          (model.create as sinon.SinonStub).restore();
        }); */
        it('Sucesso de criar um ativo ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield service.create({
                qtdeAtivo: 2,
                valorAtivo: new runtime_1.Decimal(10),
            });
            (0, chai_1.expect)(response).to.be.an('object');
        }));
    });
});
//# sourceMappingURL=ativoS.test.js.map