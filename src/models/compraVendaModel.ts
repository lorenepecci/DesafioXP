import { PrismaClient } from '@prisma/client';
import { ICompraVenda } from '../interfaces/compraVenda';

export class CompraVendaModel {
  private _prisma: PrismaClient;

  constructor(prisma = new PrismaClient()) {
    this._prisma = prisma;
  }
  async create(compraVenda: ICompraVenda): Promise<ICompraVenda> {
    return this._prisma.compraVenda.create({ data: compraVenda });
  }
}
