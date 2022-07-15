import { Request, Response } from 'express';
import { DepositoRetiradaService } from '../services/depositoRetiradaService';

const _service = new DepositoRetiradaService();
export class DepositoRetiradaController {
  private _isDeposito: boolean;
  constructor(isDeposito: boolean) {
    this._isDeposito = isDeposito;
  }
  async create(req: Request, res: Response) {
    return res.status(200).json();
  }
}
