/*
  Warnings:

  - You are about to drop the column `engineeringSummary` on the `RepositoryAIReview` table. All the data in the column will be lost.
  - You are about to drop the column `overallSummary` on the `RepositoryAIReview` table. All the data in the column will be lost.
  - You are about to drop the column `recommendations` on the `RepositoryAIReview` table. All the data in the column will be lost.
  - You are about to drop the column `strengths` on the `RepositoryAIReview` table. All the data in the column will be lost.
  - You are about to drop the column `weaknesses` on the `RepositoryAIReview` table. All the data in the column will be lost.
  - Added the required column `review` to the `RepositoryAIReview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RepositoryAIReview" DROP CONSTRAINT "RepositoryAIReview_repositoryId_fkey";

-- AlterTable
ALTER TABLE "RepositoryAIReview" DROP COLUMN "engineeringSummary",
DROP COLUMN "overallSummary",
DROP COLUMN "recommendations",
DROP COLUMN "strengths",
DROP COLUMN "weaknesses",
ADD COLUMN     "promptVersion" TEXT DEFAULT 'v2',
ADD COLUMN     "review" JSONB NOT NULL;

-- AddForeignKey
ALTER TABLE "RepositoryAIReview" ADD CONSTRAINT "RepositoryAIReview_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;
