import 'express-async-errors';
import { CriptografarSenhas } from '../helpers/criptografarSenhas';
import { ErroHttp } from '../helpers/erroHttp';
import gerarToken from '../helpers/gerarToken';
import { ILogin } from '../interfaces/login';
import { ClientesModel } from '../models/clientesModel';

export class LoginService {
  private _model: ClientesModel;
  constructor(model = new ClientesModel()) {
    this._model = model;
  }
  async create(cliente: ILogin) {
    const getCliente = await this._model.getByEmail(cliente.email);
    if (getCliente) {
      const descriptografarSenhaBD = await CriptografarSenhas.comparar(
        cliente.senha,
        getCliente.senha 
      );
      if (descriptografarSenhaBD) {
        const token = gerarToken(JSON.stringify(getCliente));
        return { token, codCliente: getCliente.codCliente };
      }
    }

    throw new ErroHttp(401, 'Email ou senha inválida.');
  }
}
