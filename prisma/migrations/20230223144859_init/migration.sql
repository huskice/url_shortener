/*
  Warnings:

  - You are about to drop the `url` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `urlAnalytic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "urlAnalytic" DROP CONSTRAINT "urlAnalytic_url_id_fkey";

-- DropTable
DROP TABLE "url";

-- DropTable
DROP TABLE "urlAnalytic";

-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UrlAnalytic" (
    "id" SERIAL NOT NULL,
    "clicked" INTEGER NOT NULL,
    "url_id" INTEGER NOT NULL,

    CONSTRAINT "UrlAnalytic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_code_key" ON "Url"("code");

-- AddForeignKey
ALTER TABLE "UrlAnalytic" ADD CONSTRAINT "UrlAnalytic_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
