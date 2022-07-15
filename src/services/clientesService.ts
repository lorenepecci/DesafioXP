import 'express-async-errors';
import HttpException from '../helpers/errorClass';
import { ICliente } from '../interfaces/clientes';
import { ClientesModel } from '../models/clientesModel';

export class ClientesService {
  private _model: ClientesModel;
  constructor(model = new ClientesModel()) {
    this._model = model;
  }
  async create(cliente: ICliente) {
    const findClient = await this._model.getByEmail(cliente.email);
    if (findClient) {
      throw new HttpException(400, 'Este usuário já foi cadastrado.');
    }
    return this._model.create(cliente);
  }
}
