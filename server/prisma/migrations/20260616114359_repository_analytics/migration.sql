-- CreateTable
CREATE TABLE "RepositoryAnalytics" (
    "id" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "forks" INTEGER NOT NULL DEFAULT 0,
    "watchers" INTEGER NOT NULL DEFAULT 0,
    "openIssues" INTEGER NOT NULL DEFAULT 0,
    "primaryLanguage" TEXT,
    "languages" JSONB,
    "contributors" INTEGER NOT NULL DEFAULT 0,
    "lastCommitDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepositoryAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RepositoryAnalytics_repositoryId_key" ON "RepositoryAnalytics"("repositoryId");

-- AddForeignKey
ALTER TABLE "RepositoryAnalytics" ADD CONSTRAINT "RepositoryAnalytics_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;
