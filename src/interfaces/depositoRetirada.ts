import { Decimal } from '@prisma/client/runtime';
export interface IDepositoRetirada {
  codCliente: number;
  tipoDeposito: boolean;
  createdAt?: Date;
  valor: Decimal;
}
