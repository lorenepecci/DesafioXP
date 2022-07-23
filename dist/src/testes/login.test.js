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
const chai_http_1 = __importDefault(require("chai-http"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
chai_1.default.use(chai_http_1.default);
const { expect } = chai_1.default;
describe('--- Testes na rota /login ---', () => {
    const fulanoLogin = {
        email: 'fulano1@gmail.com',
        senha: '12345678',
    };
    it('Deve ser possivel fazer o login', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).post('/login').send(fulanoLogin);
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.all.keys(['codCliente', 'token']);
        expect(response.body.token).to.be.an('string');
        expect(response.body.codCliente).to.be.an('number');
    }));
    it('Quando a senha for incorreta, disparar erro', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).post('/login').send({
            email: 'fulano1@gmail.com',
            senha: '123234345',
        });
        expect(response.status).to.be.equal(401);
        expect(response.body).to.have.key('message');
        expect(response.body.message).to.be.an('string');
        expect(response.body.message).to.be.equal('Email ou senha inválida.');
    }));
    it('Quando o email for incorreto, disparar erro', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).post('/login').send({
            email: 'f1@gmail.com',
            senha: '123234345',
        });
        expect(response.status).to.be.equal(401);
        expect(response.body).to.have.key('message');
        expect(response.body.message).to.be.an('string');
        expect(response.body.message).to.be.equal('Email ou senha inválida.');
    }));
    it('Quando o formato email for incorreto, disparar erro', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).post('/login').send({
            email: 'email inválido',
            senha: '123234345',
        });
        expect(response.status).to.be.equal(422);
        expect(response.body).to.have.key('message');
        expect(response.body.message).to.be.an('string');
        expect(response.body.message).to.be.equal('"email" must be a valid email');
    }));
    it('Quando o formato senha for incorreto, disparar erro', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).post('/login').send({
            email: 'fulano1@gmail.com',
            senha: 12323.4345,
        });
        expect(response.status).to.be.equal(422);
        expect(response.body).to.have.key('message');
        expect(response.body.message).to.be.an('string');
        expect(response.body.message).to.be.equal('"senha" must be a string');
    }));
    it('Quando não é passado o email, disparar erro', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).post('/login').send({
            senha: '123234345',
        });
        expect(response.status).to.be.equal(400);
        expect(response.body).to.have.key('message');
        expect(response.body.message).to.be.an('string');
        expect(response.body.message).to.be.equal('"email" is required');
    }));
    it('Quando não é passado a senha', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).post('/login').send({
            email: 'fulano1@gmail.com',
        });
        expect(response.status).to.be.equal(400);
        expect(response.body).to.have.key('message');
        expect(response.body.message).to.be.an('string');
        expect(response.body.message).to.be.equal('"senha" is required');
    }));
});
//# sourceMappingURL=login.test.js.map