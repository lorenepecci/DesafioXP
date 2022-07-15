import { PrismaClient } from '@prisma/client';
import { ICliente } from '../interfaces/clientes';

export class ClientesModel {
  private _prisma: PrismaClient;

  constructor(prisma = new PrismaClient()) {
    this._prisma = prisma;
  }
  async create(cliente: ICliente) {

    return this._prisma.cliente.create({ data: cliente });
  }
}
