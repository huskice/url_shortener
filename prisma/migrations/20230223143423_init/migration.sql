-- DropIndex
DROP INDEX "urlAnalytic_id_key";

-- AlterTable
CREATE SEQUENCE urlanalytic_id_seq;
ALTER TABLE "urlAnalytic" ALTER COLUMN "id" SET DEFAULT nextval('urlanalytic_id_seq');
ALTER SEQUENCE urlanalytic_id_seq OWNED BY "urlAnalytic"."id";
