import { Decimal } from '@prisma/client/runtime';
export interface ICliente {
  codCliente?: number;
  nome: string;
  senha: string;
  email: string;
  saldo?: Decimal;
}
