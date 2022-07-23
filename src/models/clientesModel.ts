import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { ICliente } from '../interfaces/clientes';

export class ClientesModel {
  private _prisma: PrismaClient;

  constructor(prisma = new PrismaClient()) {
    this._prisma = prisma;
  }
  async create(cliente: ICliente): Promise<ICliente> {
    return this._prisma.cliente.create({ data: cliente });
  }

  async getByEmail(email: string): Promise<ICliente | null> {
    return this._prisma.cliente.findUnique({ where: { email } });
  }

  async getByClienteCod(codCliente: number): Promise<ICliente | null> {
    return this._prisma.cliente.findUnique({ where: { codCliente } });
  }

  async updateSaldo(codCliente: number, saldo: number): Promise<ICliente> {
    return this._prisma.cliente.update({
      where: {
        codCliente,
      },
      data: {
        saldo: new Decimal(saldo),
      },
    });
  }
}
