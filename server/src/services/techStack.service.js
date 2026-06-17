const axios = require("axios");

class TechStackService {
  async detect(repo, githubToken) {
    const headers = {
      Authorization: `Bearer ${githubToken}`,
    };

    const response = await axios.get(
      `https://api.github.com/repos/${repo.owner}/${repo.name}/contents`,
      { headers },
    );

    const files = response.data;
    const allFiles = [...files];

    // Read first-level directories
    for (const file of files) {
      if (file.type === "dir") {
        const dirResponse = await axios.get(file.url, {
          headers,
        });

        allFiles.push(...dirResponse.data);
      }
    }

    const technologies = [];

    // Detect from filenames
    if (allFiles.some((f) => f.name === "vite.config.js")) {
      technologies.push("Vite");
    }

    if (allFiles.some((f) => f.name === "Dockerfile")) {
      technologies.push("Docker");
    }

    if (allFiles.some((f) => f.name === "tsconfig.json")) {
      technologies.push("TypeScript");
    }

    // Find ALL package.json files
    const packageFiles = allFiles.filter(
      (file) => file.name === "package.json",
    );

    for (const packageFile of packageFiles) {
      const packageResponse = await axios.get(packageFile.url, { headers });

      const content = Buffer.from(
        packageResponse.data.content,
        "base64",
      ).toString("utf8");

      const packageJson = JSON.parse(content);

      const dependencies = {
        ...(packageJson.dependencies || {}),
        ...(packageJson.devDependencies || {}),
      };

      // Backend
      if (dependencies.express) {
        technologies.push("Express");
      }

      if (dependencies.mongoose) {
        technologies.push("MongoDB");
      }

      if (dependencies["@prisma/client"]) {
        technologies.push("Prisma");
      }

      if (dependencies.pg) {
        technologies.push("PostgreSQL");
      }

      // Frontend
      if (dependencies.react) {
        technologies.push("React");
      }

      if (dependencies.next) {
        technologies.push("Next.js");
      }

      if (dependencies.tailwindcss) {
        technologies.push("Tailwind CSS");
      }

      // Any package.json means Node.js
      technologies.push("Node.js");
    }

    return [...new Set(technologies)];
  }
}

module.exports = new TechStackService();
