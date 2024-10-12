/*
  Warnings:

  - Made the column `id_course` on table `class` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_id_course_fkey";

-- AlterTable
ALTER TABLE "class" ALTER COLUMN "id_course" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
