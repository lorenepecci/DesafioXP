import { Request, Response } from 'express';
import { ICliente } from '../interfaces/clientes';
import { CompraVendaService } from '../services/compraVendaService';

const _service = new CompraVendaService();
export class CompraVendaController {
  async create(req: Request, res: Response) {
    const { codAtivo, qtdeAtivo } = req.body;
    const clienteLogado = JSON.parse(res.locals.payload.dataUser) as ICliente;
    const { codCliente } = clienteLogado as ICliente;
    if (codCliente) {
      const compraVendaCreated = await _service.create({
        codAtivo,
        qtdeAtivo,
        compra: true,
        codCliente, 
      });
      return res.status(200).json(compraVendaCreated); 
    }
  }
}
