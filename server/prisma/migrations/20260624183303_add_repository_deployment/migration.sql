-- CreateTable
CREATE TABLE "RepositoryDeployment" (
    "id" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "deploymentScore" INTEGER NOT NULL,
    "infrastructureScore" INTEGER NOT NULL,
    "configurationScore" INTEGER NOT NULL,
    "buildReadinessScore" INTEGER NOT NULL,
    "ciCdScore" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "checks" JSONB NOT NULL,
    "strengths" JSONB NOT NULL,
    "warnings" JSONB NOT NULL,
    "criticalIssues" JSONB NOT NULL,
    "recommendations" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepositoryDeployment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RepositoryDeployment_repositoryId_key" ON "RepositoryDeployment"("repositoryId");

-- AddForeignKey
ALTER TABLE "RepositoryDeployment" ADD CONSTRAINT "RepositoryDeployment_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
