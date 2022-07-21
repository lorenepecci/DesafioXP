import chai from 'chai';
import request from 'supertest';
import { app } from '../app';
import { IRequisicaoCompraVenda } from '../interfaces/compraVenda';
const { expect } = chai;

describe('--- Testes na rota /investimentos ---', () => {
  const compraSucesso: IRequisicaoCompraVenda = {
    codCliente: 1,
    codAtivo: 3,
    qtdeAtivo: 1,
  };
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

  describe('--- Método POST na rota /investimento/comprar ---', () => {
    it('Deve ser possivel comprar um investimento', async () => {
      const response = await request(app)
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
    });

    it('Erro token incorreto', async () => {
      const response = await request(app)
        .post('/investimentos/comprar')
        .set('Authorization', token + 'erro');
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('Token inválido.');
    });

    it('Erro "Token não encontrado ', async () => {
      const response = await request(app).post('/investimentos/comprar');
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('Token não encontrado.');
    });
    it('Não deve ser possivel fazer compras com outra conta nao logada', async () => {
      const response = await request(app)
        .post('/investimentos/comprar')
        .set('Authorization', token)
        .send({
          codCliente: 2,
          codAtivo: 3,
          qtdeAtivo: 1,
        });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal(
        'Ação nao permitida. Código do usuário incorreto.'
      );
    });

    it('Não deve ser possivel fazer compras se nao há saldo suficiente', async () => {
      const response = await request(app)
        .post('/investimentos/comprar')
        .set('Authorization', token)
        .send({
          codCliente: 1,
          codAtivo: 3,
          qtdeAtivo: 29,
        });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal(
        'Não há saldo disponível para esta compra.'
      );
    });

    it('Não deve ser possivel fazer compras se nao há quantidade disponivel na corretora', async () => {
      await request(app).post('/conta/deposito').send({
        codCliente: 1,
        valor: 1000,
      });
      const response = await request(app)
        .post('/investimentos/comprar')
        .set('Authorization', token)
        .send({
          codCliente: 1,
          codAtivo: 3,
          qtdeAtivo: 50,
        });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal(
        'Essa quantidade é maior que a quantidade disponível na corretora'
      );
    });

    it('Não deve ser possivel fazer compras se o codAtivo nao existe', async () => {
      const response = await request(app)
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
    });
  });
});
