export interface ICarteiras {
  idCarteira?: number;
  codCliente: number;
  codAtivo: number;
  qtdeAtivo: number;
}

export interface ICarteirasCliente extends ICarteiras {
  valor: number;
}
