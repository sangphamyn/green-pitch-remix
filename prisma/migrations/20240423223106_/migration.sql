-- AlterTable
ALTER TABLE `grouppitch` MODIFY `address_detail` TEXT NULL,
    MODIFY `map` TEXT NULL,
    MODIFY `images` TEXT NULL;

-- AlterTable
ALTER TABLE `pitch` ADD COLUMN `name` TEXT NULL;
