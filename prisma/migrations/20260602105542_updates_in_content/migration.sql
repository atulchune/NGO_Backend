-- CreateEnum
CREATE TYPE "MediaCategory" AS ENUM ('LIVE_KIRTAN', 'DAILY_MUKHWAK', 'MUKHWAK_KATHA');

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "showInMarquee" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "category" "MediaCategory";
