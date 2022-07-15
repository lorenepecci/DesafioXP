import 'express-async-errors';
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
}
