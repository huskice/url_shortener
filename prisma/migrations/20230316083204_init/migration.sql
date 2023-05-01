-- AlterTable
ALTER TABLE "UrlAnalytic" ADD COLUMN     "referer" TEXT,
ADD COLUMN     "uniqueVisitor" INTEGER NOT NULL DEFAULT 0;
