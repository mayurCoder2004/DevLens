-- AlterTable
ALTER TABLE "RepositoryDeployment" ADD COLUMN     "dockerQuality" JSONB,
ADD COLUMN     "lockFiles" JSONB,
ADD COLUMN     "platforms" JSONB,
ADD COLUMN     "runtime" JSONB,
ADD COLUMN     "workflowQuality" JSONB;
