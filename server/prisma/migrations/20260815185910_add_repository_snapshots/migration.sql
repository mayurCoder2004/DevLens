-- CreateTable
CREATE TABLE "RepositorySnapshot" (
    "id" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "engineeringScore" INTEGER NOT NULL,
    "technicalDebtScore" INTEGER NOT NULL,
    "architectureScore" INTEGER NOT NULL,
    "deploymentScore" INTEGER NOT NULL,
    "prRiskScore" INTEGER NOT NULL,
    "maintainabilityScore" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RepositorySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RepositorySnapshot_repositoryId_createdAt_idx" ON "RepositorySnapshot"("repositoryId", "createdAt" DESC);

-- AddForeignKey
ALTER TABLE "RepositorySnapshot" ADD CONSTRAINT "RepositorySnapshot_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;
