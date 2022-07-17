import { PrismaClient } from '@prisma/client';
import { IDepositoRetirada } from '../interfaces/depositoRetirada';

export class DepositoRetiradaModel {
  private _prisma: PrismaClient;

  constructor(prisma = new PrismaClient()) {
    this._prisma = prisma;
  }
  async create(depositoRetirada: IDepositoRetirada) {
    console.log(depositoRetirada, 'depppp', typeof depositoRetirada.valor);

    return this._prisma.depositoRetirada.create({
      data: depositoRetirada,
    });
  }
}
