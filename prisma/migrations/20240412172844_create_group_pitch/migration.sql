-- CreateTable
CREATE TABLE `grouppitch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `id_district` INTEGER NULL,
    `id_ward` INTEGER NULL,
    `address_detail` VARCHAR(191) NULL,
    `map` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `ownerId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `grouppitch` ADD CONSTRAINT `grouppitch_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
