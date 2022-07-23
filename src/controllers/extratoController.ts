import { Request, Response } from 'express';
import { ErroHttp } from '../helpers/erroHttp';
import { ExtratoService } from '../services/extratoService';

const _service = new ExtratoService();
export class ExtratoController {
  async getExtrato(req: Request, res: Response) {
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
      const extrato = await _service.getExtrato(
        Number(codCliente),
        inicio,
        fim
      );
      return res.status(200).json(extrato);
    }
  }
}
