import { Request, Response } from 'express';
import { AtivosService } from '../services/ativosService';

const _service = new AtivosService();
export class AtivosController {
  async create(req: Request, res: Response) {
    const { qtdeAtivo, valorAtivo } = req.body;
    const ativoCriado = await _service.create({
      qtdeAtivo,
      valorAtivo,
    });
    return res.status(200).json(ativoCriado);
  }

  async getByAssets(req: Request, res: Response) {
    const { codAtivo } = req.params;
    const getAtivo = await _service.getByAssets(Number(codAtivo));
    return res.status(200).json(getAtivo);
  }
}
