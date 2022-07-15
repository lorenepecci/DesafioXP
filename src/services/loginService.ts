import 'express-async-errors';
import { ILogin } from '../interfaces/login';

export class LoginService {
  async create(cliente: ILogin) {
    return 'ok';
  }
}
