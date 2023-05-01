/*
  Warnings:

  - You are about to drop the column `BrowserName` on the `UrlAnalytic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UrlAnalytic" DROP COLUMN "BrowserName",
ADD COLUMN     "browserName" TEXT;
