import chai from 'chai';
import request from 'supertest';
import { app } from '../app';
import { ICliente } from '../interfaces/clientes';
const { expect } = chai;

describe('--- Testes na rota /clientes ---', () => {
  describe('--- Método POST na rota /clientes ---', () => {
    const postClienteSucesso: ICliente = {
      nome: 'fulano4',
      senha: 'fu123456',
      email: 'fulano4@gmail.com',
    };

    it('Deve ser possivel cadastrar um cliente', async () => {
      const response = await request(app)
        .post('/clientes')
        .send( postClienteSucesso );
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.all.keys([
        'codCliente',
        'nome',
        'senha',
        'email',
        'saldo',
      ]);
      expect(response.body.nome).to.be.an('string');
      expect(response.body.senha).to.be.an('string');
      expect(response.body.email).to.be.an('string');
      expect(response.body.codCliente).to.be.an('number');
      expect(response.body.saldo).to.be.an('string');
    });
  });
});
