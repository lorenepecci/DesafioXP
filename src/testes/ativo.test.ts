import { Decimal } from '@prisma/client/runtime';
import chai from 'chai';
import request from 'supertest';
import { app } from '../app';
import { IAtivo } from '../interfaces/ativos';
const { expect } = chai;

describe('--- Testes na rota /ativos ---', () => {
  let token: string;
  let ativoCriado: IAtivo;
  beforeEach(async () => {
    ativoCriado = {
      qtdeAtivo: 60,
      valorAtivo: new Decimal(20.5),
    };
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

  describe('--- Método GET na rota /ativos ---', () => {
    describe('--- Método GET na rota /ativos/corretora ---', () => {
      it('Deve ser possivel ver todos ativos da Corretora', async () => {
        const response = await request(app)
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
      });
    });
    describe('--- Método GET na rota /ativos/{codAtivo} ---', () => {
      it('Deve ser possivel ver o Ativo ', async () => {
        const response = await request(app)
          .get('/ativos?codAtivo=1')
          .set('Authorization', token);
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.all.keys([
          'codAtivo',
          'qtdeAtivo',
          'valor',
        ]);
      });

      it('Erro se a query nao for um numero inteiro', async () => {
        const response = await request(app)
          .get('/ativos?codAtivo=string')
          .set('Authorization', token);
        expect(response.status).to.be.equal(500);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.key('message');
        expect(response.body.message).to.be.equal(
          'Parâmetro deve ser um numero inteiro.'
        );
      });
    });
    describe('--- Método GET na rota /ativos/{codCliente} ---', () => {
      it('Deve ser possivel ver a Carteira do cliente logado', async () => {
        const response = await request(app)
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
      });

      it('Não deve ser possivel ver a Carteira de outro cliente', async () => {
        const response = await request(app)
          .get('/ativos?codCliente=3')
          .set('Authorization', token);
        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.key('message');
        expect(response.body.message).to.be.equal(
          'Ação nao permitida. Código do usuário incorreto.'
        );
      });

      it('Erro se a query nao for um numero inteiro', async () => {
        const response = await request(app)
          .get('/ativos?codCliente=string')
          .set('Authorization', token);
        expect(response.status).to.be.equal(500);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.key('message');
        expect(response.body.message).to.be.equal(
          'Parâmetro deve ser um numero inteiro.'
        );
      });
    });
  });

  describe('--- Método POST na rota /ativos ---', () => {
    it('Deve ser possivel cadastrar uma ação', async () => {
      const response = await request(app)
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
    });

    it('Erro token incorreto', async () => {
      const response = await request(app)
        .post('/ativos')
        .set('Authorization', token + 'erro')
        .send({});

      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('Token inválido.');
    });

    it('Erro "Token não encontrado ', async () => {
      const response = await request(app).post('/ativos').send({});
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('Token não encontrado.');
    });

    it('Erro se não tiver o campo qtdeAtivo', async () => {
      const response = await request(app)
        .post('/ativos')
        .set('Authorization', token)
        .send({
          valorAtivo: 20.5,
        });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('"qtdeAtivo" is required');
    });

    it('Erro se não tiver o campo valorAtivo', async () => {
      const response = await request(app)
        .post('/ativos')
        .set('Authorization', token)
        .send({
          qtdeAtivo: 60,
        });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('"valorAtivo" is required');
    });
  });
});
