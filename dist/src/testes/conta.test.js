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
describe('--- Testes na rota /conta/extrato ---', () => {
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
    describe('--- Método GET na rota /conta/extrato---', () => {
        it('Deve ser possivel ver o extrato do cliente', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get('/conta/extrato?codCliente=1&inicio=2020-01-23&fim=2021-09-23')
                .set('Authorization', token);
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.all.keys(['entradas', 'saidas']);
        }));
        it('Erro token incorreto', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get('/conta/extrato?codCliente=1&inicio=2020-01-23&fim=2021-09-23')
                .set('Authorization', token + 'erro');
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Token inválido.');
        }));
        it('Erro "Token não encontrado ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app).get('/conta/extrato?codCliente=1&inicio=2020-01-23&fim=2021-09-23');
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Token não encontrado.');
        }));
    });
    describe('--- Método GET na rota /conta/:codCliente ---', () => {
        it('Deve ser possivel ver o saldo do cliente', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get('/conta/1')
                .set('Authorization', token);
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.all.keys(['codCliente', 'saldo']);
        }));
        it('Erro token incorreto', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get('/conta/1')
                .set('Authorization', token + 'erro');
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Token inválido.');
        }));
        it('Erro "Token não encontrado ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app).get('/conta/1');
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Token não encontrado.');
        }));
    });
    describe('--- Método POST na rota /conta/deposito ---', () => {
        it('Deve ser possivel fazer deposito para conta logada', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/conta/deposito')
                .set('Authorization', token)
                .send({
                codCliente: 1,
                valor: 100.99,
            });
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.all.keys([
                'codCliente',
                'message',
                'id',
                'valor',
                'tipoDeposito',
                'data',
            ]);
            expect(response.body.tipoDeposito).to.be.equal(true);
            expect(response.body.message).to.be.equal('Depósito feito com sucesso.');
        }));
        it('Erro token incorreto', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get('/conta/deposito')
                .set('Authorization', token + 'erro');
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Token inválido.');
        }));
        it('Erro "Token não encontrado ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app).get('/conta/deposito');
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Token não encontrado.');
        }));
        it('Deve ser possivel fazer deposito para outra conta', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/conta/deposito')
                .set('Authorization', token)
                .send({
                codCliente: 2,
                valor: 1.99,
            });
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.all.keys([
                'codCliente',
                'message',
                'id',
                'valor',
                'tipoDeposito',
                'data',
            ]);
            expect(response.body.tipoDeposito).to.be.equal(true);
            expect(response.body.message).to.be.equal('Depósito feito com sucesso.');
        }));
    });
    describe('--- Método POST na rota /conta/saque ---', () => {
        it('Deve ser possivel fazer saque para a conta logada', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/conta/saque')
                .set('Authorization', token)
                .send({
                codCliente: 1,
                valor: 100.99,
            });
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.all.keys([
                'codCliente',
                'message',
                'id',
                'valor',
                'tipoDeposito',
                'data',
            ]);
            expect(response.body.tipoDeposito).to.be.equal(false);
            expect(response.body.message).to.be.equal('Saque feito com sucesso.');
        }));
        it('Erro token incorreto', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get('/conta/deposito')
                .set('Authorization', token + 'erro');
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Token inválido.');
        }));
        it('Erro "Token não encontrado ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app).get('/conta/deposito');
            expect(response.status).to.be.equal(401);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Token não encontrado.');
        }));
        it('Não deve ser possivel fazer saque para outra conta', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/conta/saque')
                .set('Authorization', token)
                .send({
                codCliente: 2,
                valor: 1.99,
            });
            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.key('message');
            expect(response.body.message).to.be.equal('Conta inválida.');
        }));
    });
});
//# sourceMappingURL=conta.test.js.map