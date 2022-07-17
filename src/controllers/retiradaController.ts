import { Request, Response } from 'express';
import { ErroHttp } from '../helpers/erroHttp';
import { RetiradaService } from '../services/retiradaService';

const _service = new RetiradaService();
export class RetiradaController {
  async create(req: Request, res: Response) {
    const { codCliente, valor } = req.body;
    const clienteLogado = JSON.parse(res.locals.payload.dataUser);
    if ( clienteLogado.codCliente !== codCliente ) {
      throw new ErroHttp(400, "Conta inválida.")
    }
    const criadoRetirada = await _service.create({
      codCliente,
      valor,
    });

    return res.status(200).json(criadoRetirada);
  }
}
