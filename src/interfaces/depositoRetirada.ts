import { Decimal } from '@prisma/client/runtime';
export interface IDepositoRetirada {
  id?: number;
  codCliente: number;
  tipoDeposito?: boolean;
  data?: Date;
  valor: Decimal;
}
