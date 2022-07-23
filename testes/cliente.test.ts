import chai from 'chai';
import request from 'supertest';
import { app } from '../app';
import { ICliente } from '../interfaces/clientes';
const { expect } = chai;

describe('--- Testes na rota /clientes ---', () => {
  describe('--- Método POST na rota /clientes ---', () => {
    const postClienteSucesso: ICliente = {
      nome: 'fulano4',
      senha: '123456',
      email: 'fulano4@gmail.com',
    };

    it('Deve ser possivel cadastrar um cliente', async () => {
      const response = await request(app)
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
    });
    it('Erro se o cliente já foi cadastrado ', async () => {
      const response = await request(app)
        .post('/clientes')
        .send(postClienteSucesso);

      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal(
        'Este usuário já foi cadastrado.'
      );
    });

    it('Erro se não há o campo nome ', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({ senha: 'fu123456', email: 'fulano4@gmail.com' });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('"nome" is required');
    });

    it('Erro se não há o campo senha ', async () => {
      const response = await request(app).post('/clientes').send({
        nome: 'fulano4',
        email: 'fulano4@gmail.com',
      });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('"senha" is required');
    });
    it('Erro se não há o campo email ', async () => {
      const response = await request(app).post('/clientes').send({
        nome: 'fulano4',
        senha: 'fu123456',
      });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('"email" is required');
    });

    it('Erro se o email nao tem formato valido', async () => {
      const response = await request(app).post('/clientes').send({
        email: 'fulano',
        nome: 'fulano4',
        senha: 'fu123456',
      });

      expect(response.status).to.be.equal(422);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal(
        '"email" must be a valid email'
      );
    });
  });

  
});
