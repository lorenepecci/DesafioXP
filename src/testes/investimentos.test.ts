import chai from 'chai';
import request from 'supertest';
import { app } from '../app';
import { IRequisicaoCompraVenda } from '../interfaces/compraVenda';
const { expect } = chai;

describe('--- Testes na rota /investimentos ---', () => {
  describe('--- Método POST na rota /investimento/comprar ---', () => {
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

  describe('--- Método POST na rota /investimento/vender ---', () => {
    const vendaSucesso: IRequisicaoCompraVenda = {
      codCliente: 2,
      codAtivo: 2,
      qtdeAtivo: 1,
    };
    let token: string;
    before(async () => {
      await request(app)
        .post('/login')
        .send({
          email: 'fulano2@gmail.com',
          senha: '22345678',
        })
        .expect(200)
        .then((res) => {
          token = res.body.token;
        });
    });
    it('Deve ser possivel vender um investimento', async () => {
      const response = await request(app)
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
    });

    it('Erro token incorreto', async () => {
      const response = await request(app)
        .post('/investimentos/vender')
        .set('Authorization', token + 'erro');
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('Token inválido.');
    });

    it('Erro "Token não encontrado ', async () => {
      const response = await request(app).post('/investimentos/vender');
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal('Token não encontrado.');
    });

    it('Não deve ser possivel fazer vendas com outra conta nao logada', async () => {
      const response = await request(app)
        .post('/investimentos/vender')
        .set('Authorization', token)
        .send({
          codCliente: 3,
          codAtivo: 2,
          qtdeAtivo: 1,
        });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal(
        'Ação nao permitida. Código do usuário incorreto.'
      );
    });

    it('Não deve ser possivel fazer vendas se nao há o ativo na carteira', async () => {
      const response = await request(app)
        .post('/investimentos/vender')
        .set('Authorization', token)
        .send({
          codCliente: 2,
          codAtivo: 3,
          qtdeAtivo: 29,
        });
      expect(response.status).to.be.equal(401);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal(
        'Esse item na carteira não existe.'
      );
    });

    it('Não deve ser possivel fazer vendas se nao há quantidade disponivel na carteira', async () => {
      const response = await request(app)
        .post('/investimentos/vender')
        .set('Authorization', token)
        .send({
          codCliente: 2,
          codAtivo: 2,
          qtdeAtivo: 5,
        });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.be.equal(
        'Essa quantidade é maior que a quantidade disponível na carteira.'
      );
    });

    it('Não deve ser possivel fazer vendas se o codAtivo nao existe', async () => {
      const response = await request(app)
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
    });
  });
});
