const fileDownloader = require("./architecture/fileDownloader");

function analyzeInfrastructure(contents) {
  const dockerfile = contents.find(
    (file) => file.name === "Dockerfile"
  );

  const dockerCompose = contents.find(
    (file) =>
      file.name === "docker-compose.yml" ||
      file.name === "docker-compose.yaml"
  );

  let score = 0;

  const strengths = [];
  const warnings = [];
  const criticalIssues = [];

  if (dockerfile) {
    score += 60;
    strengths.push("Dockerfile detected");
  } else {
    criticalIssues.push("No Dockerfile found");
  }

  if (dockerCompose) {
    score += 40;
    strengths.push("Docker Compose configuration detected");
  } else {
    warnings.push("Docker Compose configuration missing");
  }

  return {
    score,

    checks: {
      dockerfile: !!dockerfile,
      dockerCompose: !!dockerCompose,
    },

    strengths,
    warnings,
    criticalIssues,
  };
}

async function analyzeConfiguration(contents) {
  let score = 0;

  const strengths = [];
  const warnings = [];
  const criticalIssues = [];

  let hasSetupInstructions = false;

  const envTemplate = contents.find(
    (file) =>
      file.name === ".env.example" ||
      file.name === ".env.sample" ||
      file.name === ".env.template"
  );

  if (envTemplate) {
    score += 50;
    strengths.push("Environment template detected");
  } else {
    criticalIssues.push("No environment template found");
  }

  const readme = contents.find(
    (file) => file.name === "README.md"
  );

  if (readme) {
    score += 20;
    strengths.push("README documentation exists");

    try {
      const content =
        await fileDownloader.downloadFileContent(
          readme.downloadUrl
        );

      const lowerContent = content.toLowerCase();

      const setupKeywords = [
        "install",
        "installation",
        "setup",
        "getting started",
        "quick start",
        "npm install",
        "npm run",
        "yarn",
        "pnpm",
        "docker",
        "environment",
        ".env",
      ];

      hasSetupInstructions = setupKeywords.some(
        (keyword) =>
          lowerContent.includes(keyword)
      );

      if (hasSetupInstructions) {
        score += 30;
        strengths.push("Setup instructions detected");
      } else {
        warnings.push(
          "README lacks setup instructions"
        );
      }
    } catch (error) {
      warnings.push(
        "Failed to analyze README"
      );
    }
  } else {
    criticalIssues.push("README file missing");
  }

  return {
    score,

    checks: {
      envTemplate: !!envTemplate,
      readme: !!readme,
      setupInstructions: hasSetupInstructions,
    },

    strengths,
    warnings,
    criticalIssues,
  };
}

module.exports = {
  analyzeInfrastructure,
  analyzeConfiguration,
};