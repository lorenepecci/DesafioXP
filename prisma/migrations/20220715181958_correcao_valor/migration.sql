/*
  Warnings:

  - You are about to drop the column `valorAtivo` on the `depositoRetirada` table. All the data in the column will be lost.
  - Added the required column `valor` to the `depositoRetirada` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `depositoRetirada` DROP COLUMN `valorAtivo`,
    ADD COLUMN `valor` DECIMAL(65, 30) NOT NULL;
