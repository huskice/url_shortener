-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UrlAnalytic" (
    "id" SERIAL NOT NULL,
    "urlCode" TEXT NOT NULL,
    "browserName" TEXT,
    "countryName" TEXT,
    "cookie" TEXT,
    "referer" TEXT,

    CONSTRAINT "UrlAnalytic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_code_key" ON "Url"("code");

-- AddForeignKey
ALTER TABLE "UrlAnalytic" ADD CONSTRAINT "UrlAnalytic_urlCode_fkey" FOREIGN KEY ("urlCode") REFERENCES "Url"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
