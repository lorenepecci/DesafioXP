import { PrismaClient } from '@prisma/client';
import { ICompraVenda } from '../interfaces/compraVenda';

export class CarteirasModel {
  private _prisma: PrismaClient;

  constructor(prisma = new PrismaClient()) {
    this._prisma = prisma;
  }
  async create(compraVenda: ICompraVenda) {
    return 'ok';
  }
  async getOne(codAtivo: string, codCliente: string) {
    return this._prisma.carteiraCliente.findFirst({
      where: {
        codAtivo,
        codCliente,
      },
    });
  }
}
