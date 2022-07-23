export interface IRelatorio {
  codAtivo: number;
  total: number;
  tipoCompra: boolean;
  data: string;
}

export interface IRelatorioRequest {
  codCliente: number;
  inicio: string;
  fim: string;
}
