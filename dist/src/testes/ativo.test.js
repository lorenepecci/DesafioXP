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
const runtime_1 = require("@prisma/client/runtime");
const chai_1 = __importDefault(require("chai"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const { expect } = chai_1.default;
describe('--- Testes na rota /ativos ---', () => {
    describe('--- Método GET na rota /ativos ---', () => {
        let token;
        let ativoCriado;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            ativoCriado = {
                qtdeAtivo: 60,
                valorAtivo: new runtime_1.Decimal(20.5),
            };
            yield (0, supertest_1.default)(app_1.app)
                .post('/login')
                .send({
                email: 'fulano1@gmail.com',
                senha: '12345678',
            })
                .expect(200)
                .then((res) => {
                token = res.body.token;
            });
        }));
        describe('--- Método GET na rota /ativos/corretora ---', () => {
            it('Deve ser possivel ver todos ativos da Corretora', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.app)
                    .get('/ativos/corretora')
                    .set('Authorization', token);
                expect(response.status).to.be.equal(200);
                expect(response.body).to.be.an('array');
                expect(response.body[0]).to.have.all.keys([
                    'codAtivo',
                    'qtdeAtivo',
                    'valorAtivo',
                    'qtdeComprada',
                ]);
            }));
        });
        describe('--- Método GET na rota /ativos/{codAtivo} ---', () => {
            it('Deve ser possivel ver o Ativo ', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.app)
                    .get('/ativos?codAtivo=1')
                    .set('Authorization', token);
                expect(response.status).to.be.equal(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.all.keys([
                    'codAtivo',
                    'qtdeAtivo',
                    'valor',
                ]);
            }));
            it('Erro se a query nao for um numero inteiro', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.app)
                    .get('/ativos?codAtivo=string')
                    .set('Authorization', token);
                expect(response.status).to.be.equal(500);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.key('message');
                expect(response.body.message).to.be.equal('Parâmetro deve ser um numero inteiro.');
            }));
        });
        describe('--- Método GET na rota /ativos/{codCliente} ---', () => {
            it('Deve ser possivel ver a Carteira do cliente logado', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.app)
                    .get('/ativos?codCliente=1')
                    .set('Authorization', token);
                expect(response.status).to.be.equal(200);
                expect(response.body).to.be.an('array');
                expect(response.body[0]).to.have.all.keys([
                    'codCliente',
                    'codAtivo',
                    'qtdeAtivo',
                    'valor',
                ]);
            }));
            it('Não deve ser possivel ver a Carteira de outro cliente', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.app)
                    .get('/ativos?codCliente=3')
                    .set('Authorization', token);
                expect(response.status).to.be.equal(400);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.key('message');
                expect(response.body.message).to.be.equal('Ação nao permitida. Código do usuário incorreto.');
            }));
            it('Erro se a query nao for um numero inteiro', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.app)
                    .get('/ativos?codCliente=string')
                    .set('Authorization', token);
                expect(response.status).to.be.equal(500);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.key('message');
                expect(response.body.message).to.be.equal('Parâmetro deve ser um numero inteiro.');
            }));
        });
    });
    describe('--- Método POST na rota /ativos ---', () => {
        let token;
        let ativoCriado;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            ativoCriado = {
                qtdeAtivo: 60,
                valorAtivo: new runtime_1.Decimal(20.5),
            };
            yield (0, supertest_1.default)(app_1.app)
                .post('/login')
                .send({
                email: 'fulano1@gmail.com',
                senha: '12345678',
            })
                .expect(200)
                .then((res) => {
                token = res.body.token;
            });
        }));
        it('Deve ser possivel cadastrar uma ação', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/ativos')
                .set('Authorization', token)
                .send(ativoCriado);
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.all.keys([
                'codAtivo',
                'qtdeAtivo',
                'valor',
            ]);
            expect(response.body.qtdeAtivo).to.be.equal(60);
            expect(response.body.valor).to.be.equal(20.5);
        }));
        it('Erro token incorreto', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/ativos')
                .set('Authorization', token + 'erro')
                .send({});
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Token inválido.');
        }));
        it('Erro "Token não encontrado ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app).post('/ativos').send({});
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Token não encontrado.');
        }));
        it('Erro se não tiver o campo qtdeAtivo', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/ativos')
                .set('Authorization', token)
                .send({
                valorAtivo: 20.5,
            });
            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('"qtdeAtivo" is required');
        }));
        it('Erro se não tiver o campo valorAtivo', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/ativos')
                .set('Authorization', token)
                .send({
                qtdeAtivo: 60,
            });
            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('"valorAtivo" is required');
        }));
    });
});
//# sourceMappingURL=ativo.test.js.map