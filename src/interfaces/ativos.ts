import { Decimal } from '@prisma/client/runtime';
export interface IAtivo {
  codAtivo?: number;
  qtdeAtivo: number;
  valorAtivo: Decimal;
}
