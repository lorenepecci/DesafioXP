import { Decimal } from '@prisma/client/runtime';
export interface ICliente {
  codCliente?: string;
  name: string;
  password: string;
  email: string;
  saldo: Decimal;
}
