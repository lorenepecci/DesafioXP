import { Request, Response } from 'express';
import { CriptografarSenhas } from '../helpers/criptografarSenhas';
import { ClientesService } from '../services/clientesService';

const _service = new ClientesService();
export class ClientesController {
  async create(req: Request, res: Response) {
    const { nome, email, senha } = req.body;
    const senhaCriptografada = await CriptografarSenhas.criptografar(senha);
    const clientePostado = await _service.create({
      nome,
      email,
      senha: senhaCriptografada,
    });
    return res.status(200).json(clientePostado);
  }

  async getSaldoCliente(req: Request, res: Response) {
    const { codCliente } = req.params;
    const getSaldoCliente = await _service.getSaldoCliente(Number(codCliente));
    return res.status(200).json(getSaldoCliente);
  }
}
