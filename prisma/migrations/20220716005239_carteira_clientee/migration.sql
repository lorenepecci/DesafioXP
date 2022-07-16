/*
  Warnings:

  - You are about to drop the column `valorAtivo` on the `compraVenda` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `compraVenda` DROP COLUMN `valorAtivo`,
    ADD COLUMN `valor` DECIMAL(65, 30) NOT NULL DEFAULT 100;
