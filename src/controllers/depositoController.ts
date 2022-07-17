import { Request, Response } from 'express';
import { DepositoService } from '../services/depositoService';

const _service = new DepositoService();
export class DepositoController {
  async create(req: Request, res: Response) {
    const { codCliente, valor } = req.body;
    const clienteLogado = JSON.parse(res.locals.payload.dataUser);

    const criadoDeposito = await _service.create(clienteLogado.codCliente, {
      codCliente,
      valor,
    });

    return res.status(200).json(criadoDeposito);
  }
}