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
    return await this._model.create(ativo);
  }

  async getByAssets(codAtivo: number) {
    const getAtivo = await this._model.getByAssets(codAtivo);
    if (!getAtivo) throw new ErroHttp(400, 'Esse ativo não existe. ');
    return getAtivo;
  }
}
