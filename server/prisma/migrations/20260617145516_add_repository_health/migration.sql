-- CreateTable
CREATE TABLE "RepositoryHealth" (
    "id" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "healthScore" INTEGER NOT NULL,
    "activityScore" INTEGER NOT NULL,
    "documentationScore" INTEGER NOT NULL,
    "maintenanceScore" INTEGER NOT NULL,
    "openSourceScore" INTEGER NOT NULL,
    "recommendations" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepositoryHealth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RepositoryHealth_repositoryId_key" ON "RepositoryHealth"("repositoryId");

-- AddForeignKey
ALTER TABLE "RepositoryHealth" ADD CONSTRAINT "RepositoryHealth_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
