-- CreateTable
CREATE TABLE "BookCategories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookCategories_name_key" ON "BookCategories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Books_name_key" ON "Books"("name");

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "BookCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
