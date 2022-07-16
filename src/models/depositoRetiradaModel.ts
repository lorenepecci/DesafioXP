import { PrismaClient } from '@prisma/client';
import { IDepositoRetirada } from '../interfaces/depositoRetirada';

export class DepositoRetiradaModel {
  private _prisma: PrismaClient;

  constructor(prisma = new PrismaClient()) {
    this._prisma = prisma;
  }
  async create(depositoRetirada: IDepositoRetirada) {
    const { codCliente, deposito, valor } = depositoRetirada;
    return this._prisma.depositoRetirada.create({
      data: {
        codCliente,
        deposito,
        valor,
      },
    });
  }
}
