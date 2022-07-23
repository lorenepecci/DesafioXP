import { Request, Response } from 'express';
import { ErroHttp } from '../helpers/erroHttp';
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

  async getAtivosCorretora(_req: Request, res: Response) {
    const getAtivosCorretora = await _service.getAtivosCorretora();
    return res.status(200).json(getAtivosCorretora);
  }

  async getAssetsOuCliente(req: Request, res: Response) {
    const { codAtivo, codCliente } = req.query;
    if (codAtivo) {
      const getAtivo = await _service.getByAssets(Number(codAtivo));
      return res.status(200).json(getAtivo);
    }
    if (codCliente) {
      const clienteLogado = JSON.parse(res.locals.payload.dataUser);
      const codClienteLogado = clienteLogado.codCliente;
      if (codCliente != codClienteLogado) {
        throw new ErroHttp(
          400,
          'Ação nao permitida. Código do usuário incorreto.'
        );
      }
      const listaCarteira = await _serviceCarteira.getClienteCarteira(
        Number(codCliente)
      );
      return res.status(200).json(listaCarteira);
    }
  }
}
