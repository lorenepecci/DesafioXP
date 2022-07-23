import { Request, Response } from 'express';
import { CriptografarSenhas } from '../helpers/criptografarSenhas';
import { ErroHttp } from '../helpers/erroHttp';
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
    const clienteLogado = JSON.parse(res.locals.payload.dataUser);
    const codClienteLogado = clienteLogado.codCliente;
    if (codClienteLogado !== Number(codCliente)) {
      throw new ErroHttp(
        400,
        'Ação nao permitida. Código do usuário incorreto.'
      );
    }
    const getSaldoCliente = await _service.getSaldoCliente(Number(codCliente));
    return res
      .status(200)
      .json({ codCliente: Number(codCliente), saldo: Number(getSaldoCliente) });
  }
}
