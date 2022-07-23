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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const { expect } = chai_1.default;
describe('--- Testes na rota /clientes ---', () => {
    describe('--- Método POST na rota /clientes ---', () => {
        const postClienteSucesso = {
            nome: 'fulano4',
            senha: '123456',
            email: 'fulano4@gmail.com',
        };
        it('Deve ser possivel cadastrar um cliente', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/clientes')
                .send(postClienteSucesso);
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.all.keys([
                'codCliente',
                'nome',
                'senha',
                'email',
                'saldo',
            ]);
        }));
        it('Erro se o cliente já foi cadastrado ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/clientes')
                .send(postClienteSucesso);
            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Este usuário já foi cadastrado.');
        }));
        it('Erro se não há o campo nome ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/clientes')
                .send({ senha: 'fu123456', email: 'fulano4@gmail.com' });
            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('"nome" is required');
        }));
        it('Erro se não há o campo senha ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app).post('/clientes').send({
                nome: 'fulano4',
                email: 'fulano4@gmail.com',
            });
            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('"senha" is required');
        }));
        it('Erro se não há o campo email ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app).post('/clientes').send({
                nome: 'fulano4',
                senha: 'fu123456',
            });
            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('"email" is required');
        }));
        it('Erro se o email nao tem formato valido', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app).post('/clientes').send({
                email: 'fulano',
                nome: 'fulano4',
                senha: 'fu123456',
            });
            expect(response.status).to.be.equal(422);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('"email" must be a valid email');
        }));
    });
});
//# sourceMappingURL=cliente.test.js.map