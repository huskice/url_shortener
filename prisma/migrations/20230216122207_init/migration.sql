-- CreateTable
CREATE TABLE "url" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "url_pkey" PRIMARY KEY ("id")
);
