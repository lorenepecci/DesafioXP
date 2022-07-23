import { Request, Response } from 'express';
import { ErroHttp } from '../helpers/erroHttp';
import { RelatorioService } from '../services/relatorioService';

const _service = new RelatorioService();
export class RelatorioController {
  async getRelatorio(req: Request, res: Response) {
    const { codCliente, inicio, fim } = req.query;
    const clienteLogado = JSON.parse(res.locals.payload.dataUser);
    const codClienteLogado = clienteLogado.codCliente;
    if (Number(codCliente) !== codClienteLogado) {
      throw new ErroHttp(
        400,
        'Ação nao permitida. Código do usuário incorreto.'
      );
    }
    if (typeof inicio === 'string' && typeof fim === 'string') {
      const relatorio = await _service.getRelatorio(
        Number(codCliente),
        inicio,
        fim
      );
      return res.status(200).json(relatorio);
    }
  }
}
