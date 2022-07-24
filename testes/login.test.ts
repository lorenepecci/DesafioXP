import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import { app } from '../src/app';
import { ILogin } from '../src/interfaces/login';

chai.use(chaiHttp);
const { expect } = chai;

describe('--- Testes na rota /login ---', () => {
  const fulanoLogin: ILogin = {
    email: 'fulano1@gmail.com',
    senha: '12345678',
  };

  it('Deve ser possivel fazer o login', async () => {
    const response = await request(app).post('/login').send(fulanoLogin);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.all.keys(['codCliente', 'token']);
    expect(response.body.token).to.be.an('string');
    expect(response.body.codCliente).to.be.an('number');
  });

  it('Quando a senha for incorreta, disparar erro', async () => {
    const response = await request(app).post('/login').send({
      email: 'fulano1@gmail.com',
      senha: '123234345',
    });
    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.key('message');
    expect(response.body.message).to.be.an('string');
    expect(response.body.message).to.be.equal('Email ou senha inválida.');
  });

  it('Quando o email for incorreto, disparar erro', async () => {
    const response = await request(app).post('/login').send({
      email: 'f1@gmail.com',
      senha: '123234345',
    });
    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.key('message');
    expect(response.body.message).to.be.an('string');
    expect(response.body.message).to.be.equal('Email ou senha inválida.');
  });

  it('Quando o formato email for incorreto, disparar erro', async () => {
    const response = await request(app).post('/login').send({
      email: 'email inválido',
      senha: '123234345',
    });
    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.key('message');
    expect(response.body.message).to.be.an('string');
    expect(response.body.message).to.be.equal('"email" must be a valid email');
  });

  it('Quando o formato senha for incorreto, disparar erro', async () => {
    const response = await request(app).post('/login').send({
      email: 'fulano1@gmail.com',
      senha: 12323.4345,
    });
    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.key('message');
    expect(response.body.message).to.be.an('string');
    expect(response.body.message).to.be.equal('"senha" must be a string');
  });

  it('Quando não é passado o email, disparar erro', async () => {
    const response = await request(app).post('/login').send({
      senha: '123234345',
    });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.key('message');
    expect(response.body.message).to.be.an('string');
    expect(response.body.message).to.be.equal('"email" is required');
  });

  it('Quando não é passado a senha', async () => {
    const response = await request(app).post('/login').send({
      email: 'fulano1@gmail.com',
    });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.key('message');
    expect(response.body.message).to.be.an('string');
    expect(response.body.message).to.be.equal('"senha" is required');
  });
});
