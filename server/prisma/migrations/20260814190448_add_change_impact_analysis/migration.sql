-- CreateTable
CREATE TABLE "ChangeImpactAnalysis" (
    "id" TEXT NOT NULL,
    "pullRequestAnalysisId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "breakdown" JSONB NOT NULL,
    "metrics" JSONB NOT NULL,
    "affectedFiles" JSONB NOT NULL,
    "criticalAffectedFiles" JSONB NOT NULL,
    "affectedAreas" JSONB NOT NULL,
    "recommendations" JSONB NOT NULL,
    "unresolvedFiles" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChangeImpactAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChangeImpactAnalysis_pullRequestAnalysisId_key" ON "ChangeImpactAnalysis"("pullRequestAnalysisId");

-- AddForeignKey
ALTER TABLE "ChangeImpactAnalysis" ADD CONSTRAINT "ChangeImpactAnalysis_pullRequestAnalysisId_fkey" FOREIGN KEY ("pullRequestAnalysisId") REFERENCES "PullRequestAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
