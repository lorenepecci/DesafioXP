import 'express-async-errors';
import HttpException from '../helpers/errorClass';
import generateToken from '../helpers/generateToken';
import { ILogin } from '../interfaces/login';
import { ClientesModel } from '../models/clientesModel';

export class LoginService {
  private _model: ClientesModel;
  constructor(model = new ClientesModel()) {
    this._model = model;
  }
  async create(cliente: ILogin) {
    const getClient = await this._model.getByEmail(cliente.email);

    if (getClient && getClient?.password === cliente.password) {
      const token = generateToken(JSON.stringify(getClient));
      return { token };
    }
    throw new HttpException(401, 'Email or password invalid.');
  }
}
