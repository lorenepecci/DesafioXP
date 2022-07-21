import chai from 'chai';
import request from 'supertest';
import { app } from '../app';
const { expect } = chai;

describe('--- Testes na rota /conta ---', () => {
  let token: string;
  before(async () => {
    await request(app)
      .post('/login')
      .send({
        email: 'fulano1@gmail.com',
        senha: '12345678',
      })
      .expect(200)
      .then((res) => {
        token = res.body.token;
      });
  });
  describe('--- Método GET na rota /conta/:codCliente ---', () => {
    it('Deve ser possivel ver o saldo do cliente', async () => {
      const response = await request(app)
        .get('/conta/1')
        .set('Authorization', token);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.all.keys(['codCliente', 'saldo']);
    });

    it('Erro token incorreto', async () => {
      const response = await request(app)
        .get('/conta/1')
        .set('Authorization', token + 'erro');
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('Token inválido.');
    });

    it('Erro "Token não encontrado ', async () => {
      const response = await request(app).get('/conta/1');
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('Token não encontrado.');
    });
  });

  describe('--- Método POST na rota /conta/deposito ---', () => {
    it('Deve ser possivel fazer deposito para conta logada', async () => {
      const response = await request(app)
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
    });

    it('Erro token incorreto', async () => {
      const response = await request(app)
        .get('/conta/deposito')
        .set('Authorization', token + 'erro');
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('Token inválido.');
    });

    it('Erro "Token não encontrado ', async () => {
      const response = await request(app).get('/conta/deposito');
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('Token não encontrado.');
    });

    it('Deve ser possivel fazer deposito para outra conta', async () => {
      const response = await request(app)
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
    });
  });

  describe('--- Método POST na rota /conta/saque ---', () => {
    it('Deve ser possivel fazer saque para a conta logada', async () => {
      const response = await request(app)
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
    });

    it('Erro token incorreto', async () => {
      const response = await request(app)
        .get('/conta/deposito')
        .set('Authorization', token + 'erro');
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('Token inválido.');
    });

    it('Erro "Token não encontrado ', async () => {
      const response = await request(app).get('/conta/deposito');
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('Token não encontrado.');
    });
    it('Não deve ser possivel fazer saque para outra conta', async () => {
      const response = await request(app)
        .post('/conta/saque')
        .set('Authorization', token)
        .send({
          codCliente: 2,
          valor: 1.99,
        });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('Conta inválida.');
    });
  });
});
