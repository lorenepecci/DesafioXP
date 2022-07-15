export interface ICompraVenda {
  id?: string;
  codCliente: string;
  codAtivo: string;
  qtdeAtivo: number;
  compra: boolean;
  createdAt?: Date;
}
