import 'express-async-errors';
import HttpException from '../helpers/erroClasse';
import { ICliente } from '../interfaces/clientes';
import { ClientesModel } from '../models/clientesModel';

export class ClientesService {
  private _model: ClientesModel;
  constructor(model = new ClientesModel()) {
    this._model = model;
  }
  async create(cliente: ICliente) {
    const findCliente = await this._model.getByEmail(cliente.email);
    if (findCliente) {
      throw new HttpException(400, 'Este usuário já foi cadastrado.');
    }
    return this._model.create(cliente);
  }

  async getSaldoCliente(codCliente: string) {
    const findCliente = await this._model.getByClienteCod(codCliente);
    if (!findCliente) {
      throw new HttpException(400, 'Este usuário não foi cadastrado.');
    }
    return findCliente.saldo;
  }
}
