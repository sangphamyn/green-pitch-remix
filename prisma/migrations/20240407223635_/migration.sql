/*
  Warnings:

  - You are about to drop the column `role1` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `role1`,
    ADD COLUMN `role` INTEGER NOT NULL DEFAULT 1;
