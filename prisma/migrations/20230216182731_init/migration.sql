/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "url_code_key" ON "url"("code");
