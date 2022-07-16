import { Request, Response } from 'express';
import { AtivosService } from '../services/ativosService';

const _service = new AtivosService();
export class AtivosController {
  async create(req: Request, res: Response) {
    const { codAtivo, qtdeAtivo, valorAtivo } = req.body;
    const ativoCriado = await _service.create({
      qtdeAtivo,
      valorAtivo,
    });
    return res.status(200).json(ativoCriado);
  }

  async getByAssets(req: Request, res: Response) {
    const { cod } = req.params;
    const getAtivo = await _service.getByAssets(cod);
    return res.status(200).json(getAtivo);
  }
}
