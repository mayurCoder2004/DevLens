/*
  Warnings:

  - You are about to drop the column `checks` on the `RepositoryDeployment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `RepositoryDeployment` table. All the data in the column will be lost.
  - Added the required column `deploymentStatus` to the `RepositoryDeployment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RepositoryDeployment" DROP CONSTRAINT "RepositoryDeployment_repositoryId_fkey";

-- AlterTable
ALTER TABLE "RepositoryDeployment" DROP COLUMN "checks",
DROP COLUMN "status",
ADD COLUMN     "deploymentStatus" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RepositoryDeployment" ADD CONSTRAINT "RepositoryDeployment_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;
