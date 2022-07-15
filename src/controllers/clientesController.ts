import { Request, Response } from 'express';
import { IUserCreateRequest } from '../interfaces/index';
import { UserService } from '../services/userService';

const _service = new ClientesService();
export class ClientesController {

  async create(req: Request, res: Response) {
    return "ok";
  }

}
