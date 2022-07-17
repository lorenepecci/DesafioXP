/*
  Warnings:

  - You are about to drop the column `createdAt` on the `compraVenda` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `depositoRetirada` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `compraVenda` DROP COLUMN `createdAt`,
    ADD COLUMN `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `depositoRetirada` DROP COLUMN `createdAt`,
    ADD COLUMN `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
