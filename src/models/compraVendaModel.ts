import { PrismaClient } from '@prisma/client';
import { ICompraVenda, ICompraVendaResposta } from '../interfaces/compraVenda';

export class CompraVendaModel {
  private _prisma: PrismaClient;

  constructor(prisma = new PrismaClient()) {
    this._prisma = prisma;
  }
  async create(compraVenda: ICompraVenda): Promise<ICompraVenda> {
    return this._prisma.compraVenda.create({ data: compraVenda });
  }

  async get(codCliente: number): Promise<ICompraVendaResposta[]> {
    return this._prisma.compraVenda.findMany({
      where: {
        codCliente,
      },
    });
  }
}
