require("dotenv").config();

const prisma = require("./src/config/prisma");

const architectureAnalyzer = require(
  "./src/services/architecture/architectureAnalyzer"
);

const circularDependencyDetector = require(
  "./src/services/architecture/circularDependencyDetector"
);

(async () => {
  const repository =
    await prisma.repository.findFirst({
      include: {
        user: true,
      },
    });

  const graph =
    await architectureAnalyzer.analyze(
      repository.owner,
      repository.name,
      repository.user.githubToken
    );

  console.log(
    circularDependencyDetector.detect(graph)
  );
})();