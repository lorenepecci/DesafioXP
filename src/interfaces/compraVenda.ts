import { Decimal } from '@prisma/client/runtime';

export interface IRequisicaoCompraVenda {
  codCliente: number;
  codAtivo: number;
  qtdeAtivo: number;
}

export interface ICompraVenda {
  id?: number;
  codCliente: number;
  codAtivo: number;
  qtdeAtivo: number;
  tipoCompra: boolean;
  data?: Date;
  valor: Decimal;
}
