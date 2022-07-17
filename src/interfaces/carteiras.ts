import { Decimal } from '@prisma/client/runtime';
export interface ICarteiras {
  idCarteira?: number;
  codCliente: number;
  codAtivo: number;
  qtdeAtivo: number;
}
