/*
  Warnings:

  - Added the required column `additions` to the `PullRequestAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletions` to the `PullRequestAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `riskBreakdown` to the `PullRequestAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalChanges` to the `PullRequestAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalFiles` to the `PullRequestAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PullRequestAnalysis" DROP CONSTRAINT "PullRequestAnalysis_repositoryId_fkey";

-- AlterTable
ALTER TABLE "PullRequestAnalysis" ADD COLUMN     "additions" INTEGER NOT NULL,
ADD COLUMN     "deletions" INTEGER NOT NULL,
ADD COLUMN     "riskBreakdown" JSONB NOT NULL,
ADD COLUMN     "totalChanges" INTEGER NOT NULL,
ADD COLUMN     "totalFiles" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PullRequestAnalysis" ADD CONSTRAINT "PullRequestAnalysis_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;
