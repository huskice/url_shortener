-- CreateTable
CREATE TABLE "urlAnalytic" (
    "id" INTEGER NOT NULL,
    "clicked" INTEGER NOT NULL,
    "url_id" INTEGER NOT NULL,

    CONSTRAINT "urlAnalytic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urlAnalytic_id_key" ON "urlAnalytic"("id");

-- CreateIndex
CREATE UNIQUE INDEX "urlAnalytic_url_id_key" ON "urlAnalytic"("url_id");

-- AddForeignKey
ALTER TABLE "urlAnalytic" ADD CONSTRAINT "urlAnalytic_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
