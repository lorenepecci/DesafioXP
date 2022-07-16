import { Decimal } from '@prisma/client/runtime';
export interface IAtivo {
  codAtivo?: string;
  qtdeAtivo: number;
  valorAtivo: Decimal;
}
