import { Request, Response } from 'express';
import { ClientesService } from '../services/clientesService';

const _service = new ClientesService();
export class ClientesController {
  async create(req: Request, res: Response) {
    const {nome, email, senha } = req.body;
    const clientePostado = await _service.create({nome, email, senha });
    return res.status(200).json(clientePostado);
  }

  async getSaldoCliente(req: Request, res: Response) {
    const { codCliente } = req.params;
    const getSaldoCliente = await _service.getSaldoCliente(codCliente);
    return res.status(200).json(getSaldoCliente);
  }
}
