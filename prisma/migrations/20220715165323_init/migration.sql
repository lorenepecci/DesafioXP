-- CreateTable
CREATE TABLE `clientes` (
    `codCliente` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `saldo` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `clientes_email_key`(`email`),
    PRIMARY KEY (`codCliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `depositoRetirada` (
    `id` VARCHAR(191) NOT NULL,
    `codCliente` VARCHAR(191) NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL,
    `deposito` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `depositoRetirada` ADD CONSTRAINT `depositoRetirada_codCliente_fkey` FOREIGN KEY (`codCliente`) REFERENCES `clientes`(`codCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;
