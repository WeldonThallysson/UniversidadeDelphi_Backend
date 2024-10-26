/*
  Warnings:

  - Added the required column `id_author` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "id_author" TEXT NOT NULL;
