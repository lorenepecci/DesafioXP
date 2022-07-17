import { Request, Response } from 'express';
import { DepositoRetiradaService } from '../services/depositoRetiradaService';

const _service = new DepositoRetiradaService();
export class DepositoRetiradaController {
  _isDeposito: boolean;
  constructor(isDeposito: boolean) {
    this._isDeposito = isDeposito;
  }

  async create(req: Request, res: Response) {
    const { codCliente, valor } = req.body;
    //const clienteLogado = JSON.parse(res.locals.payload.dataUser);
    //const { codClienteLogado } = clienteLogado;
    const criadoDeposito = await _service.create({
      codCliente,
      tipoDeposito: true,
      valor,
    });
    return res.status(200).json(criadoDeposito);
  }
}
