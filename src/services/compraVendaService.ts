import 'express-async-errors';
import { CompraVendaModel } from '../models/compraVendaModel';
import { ICompraVenda } from '../interfaces/compraVenda';

export class CompraVendaService {
  private _model: CompraVendaModel;
  constructor(model = new CompraVendaModel()) {
    this._model = model;
  }
  async create(compraVenda: ICompraVenda) {
    return await this._model.create(compraVenda);
  }
}
