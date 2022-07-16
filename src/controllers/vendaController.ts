import { Request, Response } from 'express';
import { ICliente } from '../interfaces/clientes';
import { VendaService } from '../services/vendaService';

const _service = new VendaService();
export class VendaController {
  async create(req: Request, res: Response) {
    const { codAtivo, qtdeAtivo } = req.body;
    const clienteLogado = JSON.parse(res.locals.payload.dataUser) as ICliente;
    const { codCliente } = clienteLogado as ICliente;
    if (codCliente) {
      const vendaCreated = await _service.create({
        codAtivo,
        qtdeAtivo,
        compra: false,
        codCliente,
      });
      return res.status(200).json(vendaCreated);
    }
  }
}
