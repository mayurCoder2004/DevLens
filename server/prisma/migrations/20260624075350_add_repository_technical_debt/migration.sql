-- CreateTable
CREATE TABLE "RepositoryTechnicalDebt" (
    "id" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "technicalDebtScore" INTEGER NOT NULL,
    "maintainabilityScore" INTEGER NOT NULL,
    "largeFileCount" INTEGER NOT NULL DEFAULT 0,
    "deadFileCount" INTEGER NOT NULL DEFAULT 0,
    "circularDependencyCount" INTEGER NOT NULL DEFAULT 0,
    "deepDependencyChainCount" INTEGER NOT NULL DEFAULT 0,
    "largeFiles" JSONB NOT NULL,
    "deadFiles" JSONB NOT NULL,
    "deepDependencyChains" JSONB NOT NULL,
    "recommendations" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepositoryTechnicalDebt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RepositoryTechnicalDebt_repositoryId_key" ON "RepositoryTechnicalDebt"("repositoryId");

-- AddForeignKey
ALTER TABLE "RepositoryTechnicalDebt" ADD CONSTRAINT "RepositoryTechnicalDebt_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
