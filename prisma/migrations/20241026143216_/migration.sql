-- CreateTable
CREATE TABLE "lives" (
    "id" TEXT NOT NULL,
    "id_author" TEXT NOT NULL,
    "id_category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "urlImage" TEXT NOT NULL,
    "urlVideo" TEXT NOT NULL,
    "idURLVideo" TEXT,
    "tutor" TEXT,
    "tag" TEXT NOT NULL,
    "data" TEXT,
    "status" BOOLEAN DEFAULT true,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lives_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lives" ADD CONSTRAINT "lives_id_author_fkey" FOREIGN KEY ("id_author") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lives" ADD CONSTRAINT "lives_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
