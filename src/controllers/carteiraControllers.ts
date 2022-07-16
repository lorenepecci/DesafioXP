import { Request, Response } from 'express';
import { CarteirasService } from '../services/carteirasService';

const _service = new CarteirasService();
export class CarteirasController {
  async create(req: Request, res: Response) {
    return res.status(200);
  }
  // vai ter get aqui. 
}
