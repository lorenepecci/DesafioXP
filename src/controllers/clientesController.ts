import { Request, Response } from 'express';
import { ClientesService } from '../services/clientesService';

const _service = new ClientesService();
export class ClientesController {
  async create(req: Request, res: Response) {
    const { name, email, password, saldo } = req.body;
    const clientPost = await _service.create({ name, email, password, saldo });
    return res.status(200).json(clientPost);
  }
}
