-- AlterTable
ALTER TABLE "category" ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "class" ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_At" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;
