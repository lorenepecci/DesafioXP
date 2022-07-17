import { Request, Response } from 'express';
import { ErroHttp } from '../helpers/erroHttp';
import { VendaService } from '../services/vendaService';

const _service = new VendaService();
export class VendaController {
  async create(req: Request, res: Response) {
    const { codCliente, codAtivo, qtdeAtivo } = req.body;
    const clienteLogado = JSON.parse(res.locals.payload.dataUser);
    const codClienteLogado = clienteLogado.codCliente;
    if (codCliente !== codClienteLogado) {
      throw new ErroHttp(
        400,
        'Ação nao permitida. Código do usuário incorreto.'
      );
    }
    const vendaCriada = await _service.create({
      codAtivo,
      qtdeAtivo,
      tipoCompra: false,
      codCliente,
    });
    return res.status(200).json(vendaCriada);
  }
}
