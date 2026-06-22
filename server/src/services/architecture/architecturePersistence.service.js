const prisma = require("../../config/prisma");

const architectureAnalyzer = require("./architectureAnalyzer");

const architectureMetrics = require("./architectureMetrics");

const circularDependencyDetector = require("./circularDependencyDetector");

class ArchitecturePersistenceService {
  async analyzeAndStore(repositoryId) {
    const repository = await prisma.repository.findUnique({
      where: {
        id: repositoryId,
      },
      include: {
        user: true,
      },
    });

    if (!repository) {
      throw new Error("Repository not found");
    }

    const graph = await architectureAnalyzer.analyze(
      repository.owner,
      repository.name,
      repository.user.githubToken,
    );

    const metrics = architectureMetrics.calculate(graph);

    const hasCircularDependency = circularDependencyDetector.detect(graph);

    await prisma.repositoryArchitecture.upsert({
      where: {
        repositoryId,
      },

      update: {
        graph,
        nodeCount: metrics.nodeCount,
        edgeCount: metrics.edgeCount,
        complexityScore: metrics.complexityScore,
        hasCircularDependency,
      },

      create: {
        repositoryId,

        graph,

        nodeCount: metrics.nodeCount,

        edgeCount: metrics.edgeCount,

        complexityScore: metrics.complexityScore,

        hasCircularDependency,
      },
    });

    return {
      graph,
      metrics,
      hasCircularDependency,
    };
  }

  async getArchitecture(repositoryId) {
    const architecture = await prisma.repositoryArchitecture.findUnique({
      where: {
        repositoryId,
      },
    });

    if (!architecture) {
      throw new Error("Architecture analysis not found");
    }

    return architecture;
  }
}

module.exports = new ArchitecturePersistenceService();
