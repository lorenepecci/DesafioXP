import 'express-async-errors';
import { ErroHttp } from '../helpers/erroHttp';
import { ICompraVendaResposta } from '../interfaces/compraVenda';
import { IRelatorio } from '../interfaces/relatorio';
import { CompraVendaModel } from '../models/compraVendaModel';

export class RelatorioService {
  private _model: CompraVendaModel;
  constructor(model = new CompraVendaModel()) {
    this._model = model;
  }
  async getRelatorio(
    codCliente: number,
    inicio: string,
    fim: string
  ): Promise<IRelatorio[]> {
    const historicoCV = (await this._model.get(
      codCliente
    )) as ICompraVendaResposta[];
    const listaRelatorio = [] as IRelatorio[];
    historicoCV.forEach((historico) => {
      const dataHistorico = historico.data as any;
      const dataInicio = new Date(inicio) as any;
      const dataFim = new Date(fim) as any;
      if (dataHistorico - dataInicio > 0 && dataFim - dataHistorico > 0) {
        listaRelatorio.push({
          codAtivo: historico.codAtivo,
          total: historico.qtdeAtivo * Number(historico.valor),
          tipoCompra: historico.tipoCompra,
          data:
            historico.data?.getDate() +
            '/' +
            historico.data?.getMonth() +
            '/' +
            historico.data?.getFullYear(),
        });
      }
    });

    return listaRelatorio;
  }
}
