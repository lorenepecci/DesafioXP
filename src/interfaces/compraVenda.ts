import { Decimal } from '@prisma/client/runtime';

export interface ICompraVenda {
  id?: number;
  codCliente: number;
  codAtivo: number;
  qtdeAtivo: number;
  tipoCompra: boolean;
  createdAt?: Date;
  valor: Decimal;
}
