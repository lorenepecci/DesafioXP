import { Request, Response } from 'express';
import { ClientesService } from '../services/clientesServices';

const _service = new ClientesService();
export class ClientesController {

  async create(req: Request, res: Response) {
    return "ok";
  }

}
