import { IDepositoRetirada } from '../interfaces/depositoRetirada';
import { DepositoRetiradaModel } from '../models/depositoRetiradaModel';

export class DepositoRetiradaService {
  private _model: DepositoRetiradaModel;
  constructor(model = new DepositoRetiradaModel()) {
    this._model = model;
  }
  async create(depositoRetirada: IDepositoRetirada) {
    return this._model.create(depositoRetirada);
  }
}
