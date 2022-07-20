import { Decimal } from '@prisma/client/runtime';
import { ICliente } from '../../interfaces/clientes';
import { ILogin } from '../../interfaces/login';

const fulanoLogin: ILogin = {
  email: 'fulano1@gmail.com',
  senha: '123456',
};

const fulano: ICliente = {
  codCliente: 1,
  nome: 'fulano1',
  email: 'fulano1@gmail.com',
  senha: '$2a$08$H2x75YbZ2/4Vc6hoZBlU1.lXY2NikAGlPrYsvS1KkCHiswvsd8/0K',
  saldo: new Decimal(0),
};

const get = {
  mock: fulanoLogin,
  response: fulano,
};

export { get };
