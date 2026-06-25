const fileDownloader = require("./architecture/fileDownloader");

const FRONTEND_FRAMEWORKS = [
  "react",
  "next",
  "vite",
  "vue",
  "@angular/core",
  "svelte",
  "astro",
  "nuxt",
];

const BACKEND_FRAMEWORKS = [
  "express",
  "@nestjs/core",
  "fastify",
  "koa",
  "hono",
];

function analyzeInfrastructure(contents) {
  const dockerfile = contents.find((file) => file.name === "Dockerfile");

  const dockerCompose = contents.find(
    (file) =>
      file.name === "docker-compose.yml" || file.name === "docker-compose.yaml",
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
      file.name === ".env.template",
  );

  if (envTemplate) {
    score += 50;
    strengths.push("Environment template detected");
  } else {
    criticalIssues.push("No environment template found");
  }

  const readme = contents.find((file) => file.name === "README.md");

  if (readme) {
    score += 20;
    strengths.push("README documentation exists");

    try {
      const content = await fileDownloader.downloadFileContent(
        readme.downloadUrl,
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

      hasSetupInstructions = setupKeywords.some((keyword) =>
        lowerContent.includes(keyword),
      );

      if (hasSetupInstructions) {
        score += 30;
        strengths.push("Setup instructions detected");
      } else {
        warnings.push("README lacks setup instructions");
      }
    } catch (error) {
      warnings.push("Failed to analyze README");
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

function analyzeProjectBuild(packageFile, packageJson) {
  let score = 20;

  const warnings = [];

  const scripts = packageJson.scripts || {};

  const dependencies = packageJson.dependencies || {};
  const devDependencies = packageJson.devDependencies || {};

  const allDependencies = {
    ...dependencies,
    ...devDependencies,
  };

  const dependencyNames = Object.keys(allDependencies);

  const isFrontend = FRONTEND_FRAMEWORKS.some((framework) =>
    dependencyNames.includes(framework),
  );

  const isBackend = BACKEND_FRAMEWORKS.some((framework) =>
    dependencyNames.includes(framework),
  );

  let projectType = "unknown";

  if (isFrontend) {
    projectType = "frontend";
  } else if (isBackend) {
    projectType = "backend";
  }

  if (projectType !== "unknown") {
    score += 10;
  }

  const hasBuild = !!scripts.build;
  const hasStart = !!scripts.start;
  const hasDev = !!scripts.dev;

  if (hasBuild) {
    score += 30;
  } else {
    warnings.push(`${packageFile.path} is missing a build script`);
  }

  if (hasStart) {
    score += 25;
  } else {
    warnings.push(`${packageFile.path} is missing a start script`);
  }

  if (hasDev) {
    score += 15;
  } else {
    warnings.push(`${packageFile.path} is missing a dev script`);
  }

  return {
    score,
    warnings,

    project: {
      path: packageFile.path,
      projectType,

      scripts: {
        build: hasBuild,
        start: hasStart,
        dev: hasDev,
      },
    },
  };
}

async function analyzeBuildReadiness(contents) {
  const packageFiles = contents.filter((file) => file.name === "package.json");

  if (packageFiles.length === 0) {
    return {
      score: 0,

      checks: {
        packageFiles: false,
      },

      strengths: [],
      warnings: [],
      criticalIssues: ["No package.json found"],
    };
  }

  const strengths = [`${packageFiles.length} package.json file(s) detected`];

  const warnings = [];
  const criticalIssues = [];
  const projects = [];

  let totalScore = 0;

  for (const packageFile of packageFiles) {
    try {
      const content = await fileDownloader.downloadFileContent(
        packageFile.downloadUrl,
      );

      const packageJson =
        typeof content === "string" ? JSON.parse(content) : content;

      const result = analyzeProjectBuild(packageFile, packageJson);

      totalScore += result.score;

      warnings.push(...result.warnings);

      projects.push(result.project);
    } catch (error) {
      console.error(`Failed to analyze ${packageFile.path}`, error.message);
    }
  }

  const score = Math.round(totalScore / projects.length);

  return {
    score,

    checks: {
      packageFileCount: packageFiles.length,

      frontendProjects: projects.filter(
        (project) => project.projectType === "frontend",
      ).length,

      backendProjects: projects.filter(
        (project) => project.projectType === "backend",
      ).length,
    },

    strengths,
    warnings,
    criticalIssues,
    projects,
  };
}

module.exports = {
  analyzeInfrastructure,
  analyzeConfiguration,
  analyzeBuildReadiness,
};
