import { Decimal } from '@prisma/client/runtime';
export interface ICarteiras {
  id?: string;
  codCliente: string;
  codAtivo: string;
  qtdeAtivo: number;
}
