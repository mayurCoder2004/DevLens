const repositoryScanner = require("./repositoryScanner");
const fileDownloader = require("./fileDownloader");
const importExtractor = require("./importExtractor");
const graphBuilder = require("./graphBuilder");
const dependencyResolver = require("./dependencyResolver");

class ArchitectureAnalyzer {
  async analyze(owner, repo, githubToken) {
    const files = await repositoryScanner.getAllRepositoryFiles(
      owner,
      repo,
      githubToken,
    );

    const filesWithImports = [];

    for (const file of files) {
      try {
        const content = await fileDownloader.downloadFileContent(
          file.downloadUrl,
        );

        const imports = importExtractor.extractImports(content);

        const resolvedImports = imports
  .filter((importPath) =>
    dependencyResolver.isInternalImport(importPath),
  )
  .map((importPath) =>
    dependencyResolver.resolveImport(
      importPath,
      file,
      files,
    ),
  )
  .filter(Boolean);

        filesWithImports.push({
          name: file.name,
          path: file.path,
          imports: resolvedImports,
        });
      } catch (error) {
        console.error(`Failed to process ${file.path}`);
      }
    }

    return graphBuilder.buildGraph(filesWithImports);
  }
}

module.exports = new ArchitectureAnalyzer();
