import { PrismaClient } from '@prisma/client';
import { IDepositoRetirada } from '../interfaces/depositoRetirada';

export class DepositoRetiradaModel {
  private _prisma: PrismaClient;

  constructor(prisma = new PrismaClient()) {
    this._prisma = prisma;
  }
  async create(
    depositoRetirada: IDepositoRetirada
  ): Promise<IDepositoRetirada> {
    return this._prisma.depositoRetirada.create({
      data: depositoRetirada,
    });
  }

  async get(codCliente: number): Promise<IDepositoRetirada[] | undefined> {
    return this._prisma.depositoRetirada.findMany({ where: { codCliente } });
  }
}
