import { PrismaClient } from '@prisma/client';
import { ICarteiras } from '../interfaces/carteiras';

export class CarteirasModel {
  private _prisma: PrismaClient;

  constructor(prisma = new PrismaClient()) {
    this._prisma = prisma;
  }
  async create(compra: ICarteiras) {
    return this._prisma.carteiraCliente.create({ data: compra });
  }

  async delete(codAtivo: number, codCliente: number) {
    return this._prisma.carteiraCliente.deleteMany({
      where: {
        codAtivo,
        codCliente,
      },
    });
  }

  async update(codAtivo: number, codCliente: number, qtdeAtivo: number) {
    console.log(codAtivo, codCliente, qtdeAtivo);
    return this._prisma.carteiraCliente.updateMany({
      where: {
        codAtivo,
        codCliente,
      },
      data: {
        qtdeAtivo,
      },
    });
  }
  async getClienteCarteiraAtivo(codAtivo: number, codCliente: number) {
    return this._prisma.carteiraCliente.findFirst({
      where: {
        codAtivo,
        codCliente,
      },
    });
  }
  async getClienteCarteira(codCliente: number) {
    return this._prisma.carteiraCliente.findMany({
      where: {
        codCliente,
      },
      orderBy: {
        qtdeAtivo: 'desc',
      },
      select: {
        codCliente: true,
        codAtivo: true,
        qtdeAtivo: true,
      },
    });
  }
}
