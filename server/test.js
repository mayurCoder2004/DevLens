const repositoryScanner = require("./src/services/architecture/repositoryScanner");

const deploymentAnalyzer = require("./src/services/deploymentAnalyzer.service");

async function test() {
  const contents = await repositoryScanner.getRepositoryContents(
    "mayurCoder2004",
    "chefmate",
    "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",
  );

  const report = await deploymentAnalyzer.analyzeDeployment(contents);

  console.dir(report, {
    depth: null,
  });
}

test().catch((error) => {
  console.error(error);
});
