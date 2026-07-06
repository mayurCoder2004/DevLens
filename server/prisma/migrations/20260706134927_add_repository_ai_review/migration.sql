-- CreateTable
CREATE TABLE "RepositoryAIReview" (
    "id" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "overallSummary" TEXT NOT NULL,
    "strengths" JSONB NOT NULL,
    "weaknesses" JSONB NOT NULL,
    "recommendations" JSONB NOT NULL,
    "engineeringSummary" TEXT NOT NULL,
    "modelUsed" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepositoryAIReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RepositoryAIReview_repositoryId_key" ON "RepositoryAIReview"("repositoryId");

-- AddForeignKey
ALTER TABLE "RepositoryAIReview" ADD CONSTRAINT "RepositoryAIReview_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
