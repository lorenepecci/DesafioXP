import { PrismaClient } from '@prisma/client';
import { ICarteiras } from '../interfaces/carteiras';

export class CarteirasModel {
  private _prisma: PrismaClient;

  constructor(prisma = new PrismaClient()) {
    this._prisma = prisma;
  }
  async create(compraVenda: ICarteiras) {
    return this._prisma.carteiraCliente.create({ data: compraVenda });
  }
  async getClienteCarteiraAtivo(codAtivo: number, codCliente: number) {
    return this._prisma.carteiraCliente.findFirst({
      where: {
        codAtivo,
        codCliente,
      },
    });
  }
}
