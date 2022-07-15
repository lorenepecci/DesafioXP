import 'express-async-errors';
import { ClientesModel } from '../models/clientesModel';
import { ICliente } from '../interfaces/clientes';

export class ClientesService {
  private _model: ClientesModel;
  constructor(model = new ClientesModel()) {
    this._model = model;
  }
  async create(cliente : ICliente) {
    return this._model.create(cliente)
  }
}
