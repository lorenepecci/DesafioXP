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
describe('--- Testes na rota /investimentos ---', () => {
    describe('--- Método POST na rota /investimento/comprar ---', () => {
        const compraSucesso = {
            codCliente: 1,
            codAtivo: 3,
            qtdeAtivo: 1,
        };
        let token;
        before(() => __awaiter(void 0, void 0, void 0, function* () {
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
        it('Deve ser possivel comprar um investimento', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/investimentos/comprar')
                .set('Authorization', token)
                .send(compraSucesso);
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.all.keys([
                'codCliente',
                'message',
                'id',
                'valor',
                'tipoCompra',
                'data',
                'qtdeAtivo',
                'codAtivo',
            ]);
            expect(response.body.tipoCompra).to.be.equal(true);
            expect(response.body.message).to.be.equal('Compra feita com sucesso.');
        }));
        it('Erro token incorreto', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/investimentos/comprar')
                .set('Authorization', token + 'erro');
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Token inválido.');
        }));
        it('Erro "Token não encontrado ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app).post('/investimentos/comprar');
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Token não encontrado.');
        }));
        it('Não deve ser possivel fazer compras com outra conta nao logada', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/investimentos/comprar')
                .set('Authorization', token)
                .send({
                codCliente: 2,
                codAtivo: 3,
                qtdeAtivo: 1,
            });
            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Ação nao permitida. Código do usuário incorreto.');
        }));
        it('Não deve ser possivel fazer compras se nao há saldo suficiente', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/investimentos/comprar')
                .set('Authorization', token)
                .send({
                codCliente: 1,
                codAtivo: 3,
                qtdeAtivo: 29,
            });
            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Não há saldo disponível para esta compra.');
        }));
        it('Não deve ser possivel fazer compras se nao há quantidade disponivel na corretora', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.app).post('/conta/deposito').send({
                codCliente: 1,
                valor: 1000,
            });
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/investimentos/comprar')
                .set('Authorization', token)
                .send({
                codCliente: 1,
                codAtivo: 3,
                qtdeAtivo: 50,
            });
            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Essa quantidade é maior que a quantidade disponível na corretora');
        }));
        it('Não deve ser possivel fazer compras se o codAtivo nao existe', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/investimentos/comprar')
                .set('Authorization', token)
                .send({
                codCliente: 1,
                codAtivo: -1,
                qtdeAtivo: 29,
            });
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Este Ativo não existe.');
        }));
    });
    describe('--- Método POST na rota /investimento/vender ---', () => {
        const vendaSucesso = {
            codCliente: 2,
            codAtivo: 2,
            qtdeAtivo: 1,
        };
        let token;
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.app)
                .post('/login')
                .send({
                email: 'fulano2@gmail.com',
                senha: '22345678',
            })
                .expect(200)
                .then((res) => {
                token = res.body.token;
            });
        }));
        it('Deve ser possivel vender um investimento', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/investimentos/vender')
                .set('Authorization', token)
                .send(vendaSucesso);
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.all.keys([
                'codCliente',
                'message',
                'id',
                'valor',
                'tipoCompra',
                'data',
                'qtdeAtivo',
                'codAtivo',
            ]);
            expect(response.body.tipoCompra).to.be.equal(false);
            expect(response.body.message).to.be.equal('Venda feita com sucesso.');
        }));
        it('Erro token incorreto', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/investimentos/vender')
                .set('Authorization', token + 'erro');
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Token inválido.');
        }));
        it('Erro "Token não encontrado ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app).post('/investimentos/vender');
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Token não encontrado.');
        }));
        it('Não deve ser possivel fazer vendas com outra conta nao logada', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/investimentos/vender')
                .set('Authorization', token)
                .send({
                codCliente: 3,
                codAtivo: 2,
                qtdeAtivo: 1,
            });
            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Ação nao permitida. Código do usuário incorreto.');
        }));
        it('Não deve ser possivel fazer vendas se nao há o ativo na carteira', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/investimentos/vender')
                .set('Authorization', token)
                .send({
                codCliente: 2,
                codAtivo: 3,
                qtdeAtivo: 29,
            });
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Esse item na carteira não existe.');
        }));
        it('Não deve ser possivel fazer vendas se nao há quantidade disponivel na carteira', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/investimentos/vender')
                .set('Authorization', token)
                .send({
                codCliente: 2,
                codAtivo: 2,
                qtdeAtivo: 5,
            });
            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Essa quantidade é maior que a quantidade disponível na carteira.');
        }));
        it('Não deve ser possivel fazer vendas se o codAtivo nao existe', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/investimentos/vender')
                .set('Authorization', token)
                .send({
                codCliente: 2,
                codAtivo: 100,
                qtdeAtivo: 29,
            });
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Este Ativo não existe.');
        }));
    });
});
//# sourceMappingURL=investimentos.test.js.map