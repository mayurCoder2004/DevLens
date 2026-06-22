const prisma = require("./src/config/prisma");

const architecturePersistenceService = require(
  "./src/services/architecture/architecturePersistence.service"
);

(async () => {
  const repository =
    await prisma.repository.findFirst();

  const result =
    await architecturePersistenceService
      .analyzeAndStore(repository.id);

  console.log(result);
})();