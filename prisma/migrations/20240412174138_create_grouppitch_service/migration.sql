-- CreateTable
CREATE TABLE `grouppitch_service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupPitchId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `price` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_grouppitch_service` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_grouppitch_service_AB_unique`(`A`, `B`),
    INDEX `_grouppitch_service_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `grouppitch_service` ADD CONSTRAINT `grouppitch_service_groupPitchId_fkey` FOREIGN KEY (`groupPitchId`) REFERENCES `grouppitch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grouppitch_service` ADD CONSTRAINT `grouppitch_service_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_grouppitch_service` ADD CONSTRAINT `_grouppitch_service_A_fkey` FOREIGN KEY (`A`) REFERENCES `grouppitch`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_grouppitch_service` ADD CONSTRAINT `_grouppitch_service_B_fkey` FOREIGN KEY (`B`) REFERENCES `services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
