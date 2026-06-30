const repositoryAnalysisService = require("./services/repositoryAnalysis.service");

async function test() {
  const repositoryId = "cmqfi2elj0011uzf4acrjvfyf";

  const result =
    await repositoryAnalysisService.analyzeRepository(repositoryId);

  console.log(result);

  process.exit(0);
}

test().catch(console.error);