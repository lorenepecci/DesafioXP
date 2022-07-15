/*
  Warnings:

  - You are about to drop the column `valor` on the `depositoRetirada` table. All the data in the column will be lost.
  - Added the required column `valorAtivo` to the `depositoRetirada` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `depositoRetirada` DROP COLUMN `valor`,
    ADD COLUMN `valorAtivo` DECIMAL(65, 30) NOT NULL;

-- CreateTable
CREATE TABLE `ativosCorretora` (
    `codAtivo` VARCHAR(191) NOT NULL,
    `qtdeAtivo` INTEGER NOT NULL,
    `valorAtivo` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`codAtivo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compraVenda` (
    `id` VARCHAR(191) NOT NULL,
    `codCliente` VARCHAR(191) NOT NULL,
    `codAtivo` VARCHAR(191) NOT NULL,
    `qtdeAtivo` INTEGER NOT NULL,
    `compra` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `compraVenda` ADD CONSTRAINT `compraVenda_codCliente_fkey` FOREIGN KEY (`codCliente`) REFERENCES `clientes`(`codCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compraVenda` ADD CONSTRAINT `compraVenda_codAtivo_fkey` FOREIGN KEY (`codAtivo`) REFERENCES `ativosCorretora`(`codAtivo`) ON DELETE RESTRICT ON UPDATE CASCADE;
