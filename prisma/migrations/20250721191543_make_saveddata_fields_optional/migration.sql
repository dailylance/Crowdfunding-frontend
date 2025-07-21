/*
  Warnings:

  - A unique constraint covering the columns `[scrapedDataId]` on the table `SavedData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `SavedData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavedData" ADD COLUMN     "exportedAt" TIMESTAMP(3),
ADD COLUMN     "scrapedDataId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "data" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Search" ADD COLUMN     "enabledOCR" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "resultCount" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "ScrapedData" (
    "id" TEXT NOT NULL,
    "searchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "platform" TEXT NOT NULL,
    "category" TEXT,
    "keyword" TEXT NOT NULL,
    "url" TEXT,
    "imageUrl" TEXT,
    "raised" TEXT,
    "goal" TEXT,
    "backers" TEXT,
    "daysLeft" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,
    "originalData" TEXT NOT NULL,
    "ocrData" TEXT,
    "nlpData" TEXT,
    "isRelevant" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScrapedData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedData_scrapedDataId_key" ON "SavedData"("scrapedDataId");

-- AddForeignKey
ALTER TABLE "ScrapedData" ADD CONSTRAINT "ScrapedData_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "Search"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScrapedData" ADD CONSTRAINT "ScrapedData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedData" ADD CONSTRAINT "SavedData_scrapedDataId_fkey" FOREIGN KEY ("scrapedDataId") REFERENCES "ScrapedData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
