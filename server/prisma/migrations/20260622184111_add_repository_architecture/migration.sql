-- CreateTable
CREATE TABLE "RepositoryArchitecture" (
    "id" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "graph" JSONB NOT NULL,
    "nodeCount" INTEGER NOT NULL,
    "edgeCount" INTEGER NOT NULL,
    "complexityScore" INTEGER NOT NULL,
    "hasCircularDependency" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepositoryArchitecture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RepositoryArchitecture_repositoryId_key" ON "RepositoryArchitecture"("repositoryId");

-- AddForeignKey
ALTER TABLE "RepositoryArchitecture" ADD CONSTRAINT "RepositoryArchitecture_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;
