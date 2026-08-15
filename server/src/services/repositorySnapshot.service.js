const prisma = require("../config/prisma");
const engineeringHealthService = require("./engineeringHealth.service");

async function getRepositorySnapshotData(repositoryId) {
  const repository = await prisma.repository.findUnique({
    where: {
      id: repositoryId,
    },

    include: {
      health: true,
      architecture: true,
      technicalDebt: true,
      deployment: true,

      pullRequestAnalyses: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },

      snapshots: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  if (!repository) {
    throw new Error("Repository not found");
  }

  const engineeringScore =
    engineeringHealthService.calculateEngineeringScore(repository);

  const architectureScore = repository.architecture
    ? engineeringHealthService.calculateArchitectureHealthScore(
        repository.architecture,
      )
    : 0;

  const technicalDebtScore =
    repository.technicalDebt?.technicalDebtScore ?? 0;

  const maintainabilityScore =
    repository.technicalDebt?.maintainabilityScore ?? 0;

  const deploymentScore =
    repository.deployment?.deploymentScore ?? 0;

  const prRiskScore =
    repository.pullRequestAnalyses.length > 0
      ? repository.pullRequestAnalyses[0].riskScore
      : 0;

  return {
    engineeringScore,
    technicalDebtScore,
    architectureScore,
    deploymentScore,
    prRiskScore,
    maintainabilityScore,

    previousSnapshot: repository.snapshots[0] ?? null,
  };
}

function hasSnapshotChanged(previousSnapshot, currentSnapshot) {
  if (!previousSnapshot) {
    return true;
  }

  return (
    previousSnapshot.engineeringScore !== currentSnapshot.engineeringScore ||
    previousSnapshot.technicalDebtScore !==
      currentSnapshot.technicalDebtScore ||
    previousSnapshot.architectureScore !==
      currentSnapshot.architectureScore ||
    previousSnapshot.deploymentScore !== currentSnapshot.deploymentScore ||
    previousSnapshot.prRiskScore !== currentSnapshot.prRiskScore ||
    previousSnapshot.maintainabilityScore !==
      currentSnapshot.maintainabilityScore
  );
}

async function createRepositorySnapshot(repositoryId) {
  const data = await getRepositorySnapshotData(repositoryId);

  const snapshot = {
    engineeringScore: data.engineeringScore,
    technicalDebtScore: data.technicalDebtScore,
    architectureScore: data.architectureScore,
    deploymentScore: data.deploymentScore,
    prRiskScore: data.prRiskScore,
    maintainabilityScore: data.maintainabilityScore,
  };

  if (!hasSnapshotChanged(data.previousSnapshot, snapshot)) {
    return data.previousSnapshot;
  }

  return prisma.repositorySnapshot.create({
    data: {
      repositoryId,

      engineeringScore: snapshot.engineeringScore,
      technicalDebtScore: snapshot.technicalDebtScore,
      architectureScore: snapshot.architectureScore,
      deploymentScore: snapshot.deploymentScore,
      prRiskScore: snapshot.prRiskScore,
      maintainabilityScore: snapshot.maintainabilityScore,
    },
  });
}

async function getRepositorySnapshots(repositoryId, limit = 30) {
  return prisma.repositorySnapshot.findMany({
    where: {
      repositoryId,
    },

    orderBy: {
      createdAt: "asc",
    },

    take: limit,
  });
}

async function getLatestRepositorySnapshot(repositoryId) {
  return prisma.repositorySnapshot.findFirst({
    where: {
      repositoryId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

module.exports = {
  getRepositorySnapshotData,
  createRepositorySnapshot,
  getRepositorySnapshots,
  getLatestRepositorySnapshot,
};