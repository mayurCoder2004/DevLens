-- CreateTable
CREATE TABLE "RepositoryTechStack" (
    "id" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "technologies" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepositoryTechStack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RepositoryTechStack_repositoryId_key" ON "RepositoryTechStack"("repositoryId");

-- AddForeignKey
ALTER TABLE "RepositoryTechStack" ADD CONSTRAINT "RepositoryTechStack_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;
