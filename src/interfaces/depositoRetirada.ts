import { Decimal } from '@prisma/client/runtime';
export interface IDepositoRetirada {
  id?: number;
  codCliente: number;
  tipoDeposito?: boolean;
  createdAt?: Date;
  valor: Decimal;
}
