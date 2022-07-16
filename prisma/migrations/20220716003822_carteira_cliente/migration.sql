-- AlterTable
ALTER TABLE `compraVenda` ADD COLUMN `valorAtivo` DECIMAL(65, 30) NOT NULL DEFAULT 100;

-- CreateTable
CREATE TABLE `carteirasClientes` (
    `id` VARCHAR(191) NOT NULL,
    `codCliente` VARCHAR(191) NOT NULL,
    `codAtivo` VARCHAR(191) NOT NULL,
    `qtdeAtivo` INTEGER NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `carteirasClientes` ADD CONSTRAINT `carteirasClientes_codCliente_fkey` FOREIGN KEY (`codCliente`) REFERENCES `clientes`(`codCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carteirasClientes` ADD CONSTRAINT `carteirasClientes_codAtivo_fkey` FOREIGN KEY (`codAtivo`) REFERENCES `ativosCorretora`(`codAtivo`) ON DELETE RESTRICT ON UPDATE CASCADE;
