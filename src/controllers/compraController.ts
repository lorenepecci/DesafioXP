import { Request, Response } from 'express';
import { ErroHttp } from '../helpers/erroHttp';
import { CompraService } from '../services/compraService';

const _service = new CompraService();
export class CompraController {
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
    const compraCriada = await _service.create({
      codAtivo,
      qtdeAtivo,
      tipoCompra: true,
      codCliente,
    });
    if (compraCriada) {
      return res.status(200).json('Compra feita com sucesso.');
    }
  }
}
