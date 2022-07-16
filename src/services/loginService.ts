import 'express-async-errors';
import HttpException from '../helpers/erroClasse';
import generateToken from '../helpers/gerarToken';
import { ILogin } from '../interfaces/login';
import { ClientesModel } from '../models/clientesModel';

export class LoginService {
  private _model: ClientesModel;
  constructor(model = new ClientesModel()) {
    this._model = model;
  }
  async create(cliente: ILogin) {
    const getCliente = await this._model.getByEmail(cliente.email);

    if (getCliente && getCliente?.password === cliente.password) {
      const token = generateToken(JSON.stringify(getCliente));
      return { token };
    }
    throw new HttpException(401, 'Email ou senha inválida.');
  }
}
