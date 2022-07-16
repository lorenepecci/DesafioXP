import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { ICliente } from '../interfaces/clientes';

export class ClientesModel {
  private _prisma: PrismaClient;

  constructor(prisma = new PrismaClient()) {
    this._prisma = prisma;
  }
  async create(cliente: ICliente) {
    return this._prisma.cliente.create({ data: cliente });
  }

  async getByEmail(email: string) {
    return this._prisma.cliente.findUnique({ where: { email } });
  }

  async getByClienteCod(codCliente: string) {
    return this._prisma.cliente.findUnique({ where: { codCliente } });
  };

  async updateSaldo(codCliente: string, saldo: number) {
    console.log(saldo, new Decimal(saldo));
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
