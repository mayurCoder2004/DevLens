const prisma = require("./config/prisma");

(async () => {
  const tech = await prisma.repositoryTechStack.findFirst();

  console.log(JSON.stringify(tech, null, 2));
})();
