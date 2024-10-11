/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_id_author_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_id_category_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_id_course_fkey";

-- DropTable
DROP TABLE "Class";

-- CreateTable
CREATE TABLE "class" (
    "id" TEXT NOT NULL,
    "id_author" TEXT NOT NULL,
    "id_course" TEXT NOT NULL,
    "id_category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "urlImage" TEXT NOT NULL,
    "urlVideo" TEXT NOT NULL,
    "idURLVideo" TEXT,
    "tutor" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "class_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_id_author_fkey" FOREIGN KEY ("id_author") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
