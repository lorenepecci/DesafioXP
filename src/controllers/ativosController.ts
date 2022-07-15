import { Request, Response } from 'express';
import { AtivosService } from '../services/ativosService';

const _service = new AtivosService();
export class AtivosController {
  async create(req: Request, res: Response) {
    const { codAtivo, qtdeAtivo, valorAtivo } = req.body;
    const ativoCreated = await _service.create({
      qtdeAtivo,
      valorAtivo,
    });
    return res.status(200).json(ativoCreated);
  }
}
