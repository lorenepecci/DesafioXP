import { PrismaClient } from '@prisma/client';
import { IAtivo } from '../interfaces/ativos';

export class AtivosModel {
  private _prisma: PrismaClient;

  constructor(prisma = new PrismaClient()) {
    this._prisma = prisma;
  }
  async create(ativo: IAtivo) {
    return this._prisma.ativo.create({ data: ativo });
  }

  async getByAssets(codAtivo: number) {
    return this._prisma.ativo.findUnique({ where: { codAtivo } });
  }

  async updateQuantidadeAtivo(codAtivo: number, qtdeAtivo: number) {
    return this._prisma.ativo.update({
      where: {
        codAtivo,
      },
      data: {
        qtdeAtivo,
      },
    });
  }
}
