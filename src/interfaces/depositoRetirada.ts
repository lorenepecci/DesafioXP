import { Decimal } from '@prisma/client/runtime';
export interface IDepositoRetirada {
  codCliente: string;
  deposito: boolean;
  createdAt?: Date;
  valor: Decimal;
}
