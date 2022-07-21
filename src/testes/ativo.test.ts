import { Decimal } from '@prisma/client/runtime';
import chai from 'chai';
import request from 'supertest';
import { app } from '../app';
import { IAtivo } from '../interfaces/ativos';
const { expect } = chai;

describe('--- Testes na rota /ativos ---', () => {
  let token: string;
  const ativoCriado: IAtivo = {
    qtdeAtivo: 60,
    valorAtivo: new Decimal(20.5),
  };
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
