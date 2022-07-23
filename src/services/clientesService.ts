import { Decimal } from '@prisma/client/runtime';
import 'express-async-errors';
import { ErroHttp } from '../helpers/erroHttp';
import { ICliente } from '../interfaces/clientes';
import { ClientesModel } from '../models/clientesModel';

export class ClientesService {
  private _model: ClientesModel;
  constructor(model = new ClientesModel()) {
    this._model = model;
  }
  async create(cliente: ICliente): Promise<ICliente> {
    const encontraCliente = await this._model.getByEmail(cliente.email);
    if (encontraCliente) {
      throw new ErroHttp(400, 'Este usuário já foi cadastrado.');
    }
    return this._model.create(cliente);
  }

  async getSaldoCliente(codCliente: number): Promise<Decimal | undefined> {
    const encontraCliente = await this._model.getByClienteCod(codCliente);
    if (!encontraCliente) {
      throw new ErroHttp(400, 'Este usuário não foi cadastrado.');
    }
    return encontraCliente.saldo;
  }
}
