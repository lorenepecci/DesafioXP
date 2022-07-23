import { PrismaClient } from '@prisma/client';
import { IAtivo } from '../interfaces/ativos';

export class AtivosModel {
  private _prisma: PrismaClient;

  constructor(prisma = new PrismaClient()) {
    this._prisma = prisma;
  }
  async create(ativo: IAtivo): Promise<IAtivo> {
    return this._prisma.ativo.create({ data: ativo });
  }

  async getAtivosCorretora(): Promise<IAtivo[]> {
    return this._prisma.ativo.findMany();
  }

  async getByAssets(codAtivo: number): Promise<IAtivo | null> {
    return this._prisma.ativo.findUnique({ where: { codAtivo } });
  }

  async updateQuantidadeAtivo(
    codAtivo: number,
    qtdeAtivo: number
  ): Promise<IAtivo> {
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
