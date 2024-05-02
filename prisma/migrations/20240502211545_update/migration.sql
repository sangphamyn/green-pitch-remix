/*
  Warnings:

  - Added the required column `id_pitch` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `id_pitch` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_id_pitch_fkey` FOREIGN KEY (`id_pitch`) REFERENCES `pitch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
