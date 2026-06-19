require("dotenv").config();

const prisma = require("./src/config/prisma");

const architectureAnalyzer = require(
  "./src/services/architecture/architectureAnalyzer"
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
    JSON.stringify(graph, null, 2)
  );
})();