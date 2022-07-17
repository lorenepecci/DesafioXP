import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.ativo.deleteMany({});
  await prisma.carteiraCliente.deleteMany({});
  await prisma.cliente.deleteMany({});
  await prisma.compraVenda.deleteMany({});
  await prisma.depositoRetirada.deleteMany({});

  await prisma.ativo.createMany({
    data: [
      {
        codAtivo: 1,
        qtdeAtivo: 20,
        valorAtivo: 2.5,
      },
      {
        codAtivo: 2,
        qtdeAtivo: 25,
        valorAtivo: 5.5,
      },
      {
        codAtivo: 3,
        qtdeAtivo: 50,
        valorAtivo: 7.5,
      },
    ],
  });

  await prisma.cliente.createMany({
    data: [
      {
        codCliente: 1,
        nome: 'fulano1',
        senha: '12345678',
        email: 'fulano1@gmail.com',
        saldo: 300.0,
      },
      {
        codCliente: 2,
        nome: 'fulano2',
        senha: '22345678',
        email: 'fulano2@gmail.com',
        saldo: 200.0,
      },
      {
        codCliente: 3,
        nome: 'fulano3',
        senha: '32345678',
        email: 'fulano3@gmail.com',
        saldo: 400.0,
      },
    ],
  });

  await prisma.compraVenda.createMany({
    data: [
      {
        id: 1,
        codCliente: 1,
        codAtivo: 1,
        qtdeAtivo: 3,
        tipoCompra: true,
        createdAt: new Date(),
        valor: 2.5,
      },
      {
        id: 2,
        codCliente: 1,
        codAtivo: 1,
        qtdeAtivo: 1,
        tipoCompra: false,
        createdAt: new Date(),
        valor: 2.5,
      },
      {
        id: 3,
        codCliente: 2,
        codAtivo: 2,
        qtdeAtivo: 4,
        tipoCompra: true,
        createdAt: new Date(),
        valor: 5.5,
      },
    ],
  });
  await prisma.carteiraCliente.createMany({
    data: [
      {
        idCarteira: 1,
        codCliente: 1,
        codAtivo: 1,
        qtdeAtivo: 2,
      },
      {
        idCarteira: 2,
        codCliente: 2,
        codAtivo: 2,
        qtdeAtivo: 4,
      },
    ],
  });
  await prisma.depositoRetirada.createMany({
    data: [
      {
        codCliente: 1,
        tipoDeposito: true,
        createdAt: new Date(),
        valor: 1.0,
      },
      {
        codCliente: 1,
        tipoDeposito: false,
        createdAt: new Date(),
        valor: 1.0,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
