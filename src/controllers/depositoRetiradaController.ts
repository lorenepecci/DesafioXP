import { Request, Response } from 'express';
import { ICliente } from '../interfaces/clientes';
import { DepositoRetiradaService } from '../services/depositoRetiradaService';

const _service = new DepositoRetiradaService();
export class DepositoRetiradaController {
  _isDeposito: boolean;
  constructor(isDeposito: boolean) {
    console.log(isDeposito, 'log');
    this._isDeposito = isDeposito;
  }

  async create(req: Request, res: Response) {
    console.log(this._isDeposito);
    const { valor } = req.body;
    const clienteLogged = JSON.parse(res.locals.payload.dataUser);
    const { codCliente } = clienteLogged as ICliente;
    if (codCliente) {
      const createdDeposito = await _service.create({
        codCliente,
        deposito: true,
        valor,
      });
      return res.status(200).json(createdDeposito);
    }
  }
}
