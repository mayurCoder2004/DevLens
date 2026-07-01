-- CreateTable
CREATE TABLE "PullRequestAnalysis" (
    "id" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "prNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "changedFiles" JSONB NOT NULL,
    "criticalFiles" JSONB NOT NULL,
    "hasDependencyChanges" BOOLEAN NOT NULL DEFAULT false,
    "hasConfigurationChanges" BOOLEAN NOT NULL DEFAULT false,
    "recommendations" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PullRequestAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PullRequestAnalysis_repositoryId_prNumber_key" ON "PullRequestAnalysis"("repositoryId", "prNumber");

-- AddForeignKey
ALTER TABLE "PullRequestAnalysis" ADD CONSTRAINT "PullRequestAnalysis_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
