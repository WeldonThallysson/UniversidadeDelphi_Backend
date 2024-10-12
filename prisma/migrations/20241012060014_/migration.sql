/*
  Warnings:

  - Added the required column `urlImage` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_id_course_fkey";

-- AlterTable
ALTER TABLE "class" ALTER COLUMN "id_course" DROP NOT NULL;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "urlImage" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
