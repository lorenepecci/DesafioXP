/*
  Warnings:

  - The primary key for the `ativosCorretora` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `codAtivo` on the `ativosCorretora` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `carteirasClientes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `carteirasClientes` table. All the data in the column will be lost.
  - You are about to alter the column `codCliente` on the `carteirasClientes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `codAtivo` on the `carteirasClientes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `clientes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `clientes` table. All the data in the column will be lost.
  - You are about to alter the column `codCliente` on the `clientes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `compraVenda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `compra` on the `compraVenda` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `compraVenda` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `codCliente` on the `compraVenda` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `codAtivo` on the `compraVenda` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `depositoRetirada` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deposito` on the `depositoRetirada` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `depositoRetirada` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `codCliente` on the `depositoRetirada` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `idCarteira` to the `carteirasClientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoCompra` to the `compraVenda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoDeposito` to the `depositoRetirada` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `carteirasClientes` DROP FOREIGN KEY `carteirasClientes_codAtivo_fkey`;

-- DropForeignKey
ALTER TABLE `carteirasClientes` DROP FOREIGN KEY `carteirasClientes_codCliente_fkey`;

-- DropForeignKey
ALTER TABLE `compraVenda` DROP FOREIGN KEY `compraVenda_codAtivo_fkey`;

-- DropForeignKey
ALTER TABLE `compraVenda` DROP FOREIGN KEY `compraVenda_codCliente_fkey`;

-- DropForeignKey
ALTER TABLE `depositoRetirada` DROP FOREIGN KEY `depositoRetirada_codCliente_fkey`;

-- AlterTable
ALTER TABLE `ativosCorretora` DROP PRIMARY KEY,
    MODIFY `codAtivo` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`codAtivo`);

-- AlterTable
ALTER TABLE `carteirasClientes` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `idCarteira` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `codCliente` INTEGER NOT NULL,
    MODIFY `codAtivo` INTEGER NOT NULL,
    ADD PRIMARY KEY (`idCarteira`);

-- AlterTable
ALTER TABLE `clientes` DROP PRIMARY KEY,
    DROP COLUMN `name`,
    DROP COLUMN `password`,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL,
    ADD COLUMN `senha` VARCHAR(191) NOT NULL,
    MODIFY `codCliente` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`codCliente`);

-- AlterTable
ALTER TABLE `compraVenda` DROP PRIMARY KEY,
    DROP COLUMN `compra`,
    ADD COLUMN `tipoCompra` BOOLEAN NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `codCliente` INTEGER NOT NULL,
    MODIFY `codAtivo` INTEGER NOT NULL,
    ALTER COLUMN `valor` DROP DEFAULT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `depositoRetirada` DROP PRIMARY KEY,
    DROP COLUMN `deposito`,
    ADD COLUMN `tipoDeposito` BOOLEAN NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `codCliente` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `carteirasClientes` ADD CONSTRAINT `carteirasClientes_codCliente_fkey` FOREIGN KEY (`codCliente`) REFERENCES `clientes`(`codCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carteirasClientes` ADD CONSTRAINT `carteirasClientes_codAtivo_fkey` FOREIGN KEY (`codAtivo`) REFERENCES `ativosCorretora`(`codAtivo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compraVenda` ADD CONSTRAINT `compraVenda_codCliente_fkey` FOREIGN KEY (`codCliente`) REFERENCES `clientes`(`codCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compraVenda` ADD CONSTRAINT `compraVenda_codAtivo_fkey` FOREIGN KEY (`codAtivo`) REFERENCES `ativosCorretora`(`codAtivo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `depositoRetirada` ADD CONSTRAINT `depositoRetirada_codCliente_fkey` FOREIGN KEY (`codCliente`) REFERENCES `clientes`(`codCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;
