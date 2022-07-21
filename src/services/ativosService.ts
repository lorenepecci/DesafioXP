import 'express-async-errors';
import { ErroHttp } from '../helpers/erroHttp';
import { IAtivo } from '../interfaces/ativos';
import { AtivosModel } from '../models/ativosModel';

export class AtivosService {
  private _model: AtivosModel;
  constructor(model = new AtivosModel()) {
    this._model = model;
  }
  async create(ativo: IAtivo) {
    const ativoCriado = await this._model.create(ativo);
    return {
      codAtivo: ativoCriado.codAtivo,
      qtdeAtivo: ativoCriado.qtdeAtivo,
      valor: Number(ativoCriado.valorAtivo),
    };
  }

  async getByAssets(codAtivo: number) {
    const getAtivo = await this._model.getByAssets(codAtivo);
    if (!getAtivo) throw new ErroHttp(400, 'Esse ativo não existe. ');
    const { qtdeAtivo, valorAtivo } = getAtivo;
    return { codAtivo, qtdeAtivo, valor: Number(valorAtivo) };
  }
}
