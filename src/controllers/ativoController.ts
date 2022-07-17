import { Request, Response } from 'express';
import { AtivosService } from '../services/ativosService';
import { CarteirasService } from '../services/carteirasService';

const _service = new AtivosService();
const _serviceCarteira = new CarteirasService();
export class AtivosController {
  async create(req: Request, res: Response) {
    const { qtdeAtivo, valorAtivo } = req.body;
    const ativoCriado = await _service.create({
      qtdeAtivo,
      valorAtivo,
    });
    return res.status(200).json(ativoCriado);
  }

  async getAssetsOuCliente(req: Request, res: Response) {
    const { codAtivo, codCliente } = req.query;
    if (codAtivo) {
      const getAtivo = await _service.getByAssets(Number(codAtivo));
      return res.status(200).json(getAtivo);
    }
    if (codCliente) {
      const listaCarteira = await _serviceCarteira.getClienteCarteira(
        Number(codCliente)
      );
      return res.status(200).json(listaCarteira);
    }
  }
}
