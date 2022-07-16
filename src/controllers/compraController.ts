import { Request, Response } from 'express';
import { ICliente } from '../interfaces/clientes';
import { CompraService } from '../services/compraService';

const _service = new CompraService();
export class CompraController {
  async create(req: Request, res: Response) {
    const { codAtivo, qtdeAtivo } = req.body;
    const clienteLogado = JSON.parse(res.locals.payload.dataUser) as ICliente;
    const { codCliente } = clienteLogado as ICliente;
    if (codCliente) {
      const compraCreated = await _service.create({
        codAtivo,
        qtdeAtivo,
        compra: true,
        codCliente, 
      });
      return res.status(200).json(compraCreated); 
    }
  }
}
