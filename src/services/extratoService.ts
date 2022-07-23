import 'express-async-errors';
import { ErroHttp } from '../helpers/erroHttp';
import { IExtrato } from '../interfaces/extrato';
import { DepositoRetiradaModel } from '../models/depositoRetiradaModel';

export class ExtratoService {
  private _model: DepositoRetiradaModel;
  constructor(model = new DepositoRetiradaModel()) {
    this._model = model;
  }
  async getExtrato(
    codCliente: number,
    inicio: string,
    fim: string
  ): Promise<IExtrato> {
    const historicoDR = await this._model.get(codCliente);
    if (!historicoDR) {
      throw new ErroHttp(404, 'Não existe nenhuma movimentação.');
    }
    let entradas: number = 0;
    let saidas: number = 0;
    historicoDR.forEach((historico) => {
      const dataHistorico = historico.data as any;
      const dataInicio = new Date(inicio) as any;
      const dataFim = new Date(fim) as any;
      if (dataHistorico - dataInicio > 0 && dataFim - dataHistorico > 0) {
        if (historico.tipoDeposito === true) {
          entradas += Number(historico.valor);
        }
        if (historico.tipoDeposito === false) {
          saidas += Number(historico.valor);
        }
      }
    });

    return { entradas, saidas };
  }
}
