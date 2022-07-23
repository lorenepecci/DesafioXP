import { Decimal } from '@prisma/client/runtime';
export interface IAtivo {
  codAtivo?: number;
  qtdeAtivo: number;
  valorAtivo: Decimal;
}

export interface IAtivoRetorno extends Omit<IAtivo, 'valorAtivo'> {
  valor: number;
}
