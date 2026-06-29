const fileDownloader = require("./architecture/fileDownloader");
const prisma = require("../config/prisma");

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

function analyzeCiCd(contents) {
  let score = 0;

  const strengths = [];
  const warnings = [];
  const criticalIssues = [];

  const workflowFiles = contents.filter((file) =>
    file.path.startsWith(".github/workflows/"),
  );

  const hasWorkflowDirectory = workflowFiles.length > 0;

  if (hasWorkflowDirectory) {
    score += 25;
    strengths.push("GitHub Actions workflows detected");
  } else {
    criticalIssues.push("No GitHub Actions workflows found");
  }

  const hasBuildWorkflow = workflowFiles.some((file) => {
    const name = file.name.toLowerCase();

    return name.includes("build") || name.includes("ci");
  });

  if (hasBuildWorkflow) {
    score += 30;
    strengths.push("Build workflow detected");
  } else {
    warnings.push("No build workflow found");
  }

  const hasTestWorkflow = workflowFiles.some((file) =>
    file.name.toLowerCase().includes("test"),
  );

  if (hasTestWorkflow) {
    score += 20;
    strengths.push("Test workflow detected");
  } else {
    warnings.push("No test workflow found");
  }

  const hasDeployWorkflow = workflowFiles.some((file) => {
    const name = file.name.toLowerCase();

    return (
      name.includes("deploy") ||
      name.includes("release") ||
      name.includes("publish")
    );
  });

  if (hasDeployWorkflow) {
    score += 25;
    strengths.push("Deployment workflow detected");
  } else {
    warnings.push("No deployment workflow found");
  }

  return {
    score,

    checks: {
      workflowDirectory: hasWorkflowDirectory,
      buildWorkflow: hasBuildWorkflow,
      testWorkflow: hasTestWorkflow,
      deployWorkflow: hasDeployWorkflow,
    },

    strengths,
    warnings,
    criticalIssues,
  };
}

function getDeploymentStatus(score) {
  if (score >= 90) {
    return "Production Ready";
  }

  if (score >= 75) {
    return "Deployable";
  }

  if (score >= 60) {
    return "Deployable With Risks";
  }

  return "Not Deployment Ready";
}

function generateDeploymentRecommendations(report) {
  const recommendations = [];

  if (!report.infrastructure.checks.dockerfile) {
    recommendations.push(
      "Create a Dockerfile to containerize the application.",
    );
  }

  if (!report.infrastructure.checks.dockerCompose) {
    recommendations.push(
      "Add a docker-compose.yml file for local multi-service development.",
    );
  }

  if (!report.configuration.checks.envTemplate) {
    recommendations.push(
      "Provide a .env.example file documenting required environment variables.",
    );
  }

  if (
    !report.buildReadiness.projects.every((project) => project.scripts.build)
  ) {
    recommendations.push(
      "Add build scripts for all projects that require production builds.",
    );
  }

  if (!report.ciCd.checks.workflowDirectory) {
    recommendations.push(
      "Configure GitHub Actions to automate builds, tests, and deployments.",
    );
  }

  return recommendations;
}

async function analyzeDeployment(contents) {
  const infrastructure = analyzeInfrastructure(contents);

  const configuration = await analyzeConfiguration(contents);

  const buildReadiness = await analyzeBuildReadiness(contents);

  const ciCd = analyzeCiCd(contents);

  const deploymentScore = Math.round(
    infrastructure.score * 0.3 +
      configuration.score * 0.25 +
      buildReadiness.score * 0.25 +
      ciCd.score * 0.2,
  );

  const status = getDeploymentStatus(deploymentScore);

  const recommendations = generateDeploymentRecommendations({
    infrastructure,
    configuration,
    buildReadiness,
    ciCd,
  });

  return {
    deploymentScore,

    status,

    infrastructure,

    configuration,

    buildReadiness,

    ciCd,

    strengths: [
      ...infrastructure.strengths,
      ...configuration.strengths,
      ...buildReadiness.strengths,
      ...ciCd.strengths,
    ],

    warnings: [
      ...infrastructure.warnings,
      ...configuration.warnings,
      ...buildReadiness.warnings,
      ...ciCd.warnings,
    ],

    criticalIssues: [
      ...infrastructure.criticalIssues,
      ...configuration.criticalIssues,
      ...buildReadiness.criticalIssues,
      ...ciCd.criticalIssues,
    ],

    recommendations,
  };
}

async function saveDeploymentReport(repositoryId, report) {
  return prisma.repositoryDeployment.upsert({
    where: {
      repositoryId,
    },

    update: {
      deploymentScore: report.deploymentScore,
      deploymentStatus: report.status,

      infrastructureScore: report.infrastructure.score,

      configurationScore: report.configuration.score,

      buildReadinessScore: report.buildReadiness.score,

      ciCdScore: report.ciCd.score,

      strengths: report.strengths,
      warnings: report.warnings,
      criticalIssues: report.criticalIssues,

      recommendations: report.recommendations,
    },

    create: {
      repositoryId,

      deploymentScore: report.deploymentScore,

      deploymentStatus: report.status,

      infrastructureScore: report.infrastructure.score,

      configurationScore: report.configuration.score,

      buildReadinessScore: report.buildReadiness.score,

      ciCdScore: report.ciCd.score,

      strengths: report.strengths,

      warnings: report.warnings,

      criticalIssues: report.criticalIssues,

      recommendations: report.recommendations,
    },
  });
}

async function analyzeDeploymentPlatforms(contents) {
  const platforms = [];

  const hasFile = (...names) =>
    contents.some((file) => names.includes(file.name));

  if (hasFile("vercel.json")) {
    platforms.push("Vercel");
  }

  if (hasFile("netlify.toml")) {
    platforms.push("Netlify");
  }

  if (
    hasFile("render.yaml", "render.yml")
  ) {
    platforms.push("Render");
  }

  if (hasFile("railway.json")) {
    platforms.push("Railway");
  }

  if (hasFile("fly.toml")) {
    platforms.push("Fly.io");
  }

  if (
    hasFile(
      "docker-compose.yml",
      "docker-compose.yaml"
    )
  ) {
    platforms.push("Docker Compose");
  }

  return {
    platforms,
  };
}

async function analyzeDockerfileQuality(contents) {
  const dockerfile = contents.find(
    (file) => file.name === "Dockerfile"
  );

  if (!dockerfile) {
    return {
      score: 0,

      checks: {
        dockerfile: false,
      },

      strengths: [],
      warnings: [],
      criticalIssues: [
        "Dockerfile not found",
      ],
    };
  }

  const content =
    await fileDownloader.downloadFileContent(
      dockerfile.downloadUrl
    );

  const dockerContent = content.toString();

  let score = 0;

  const strengths = [];
  const warnings = [];
  const criticalIssues = [];

  const checks = {
    dockerfile: true,
    baseImage: false,
    workdir: false,
    copy: false,
    install: false,
    expose: false,
    cmd: false,
    multiStage: false,
  };

  if (/^FROM\s+/im.test(dockerContent)) {
    checks.baseImage = true;
    score += 20;
    strengths.push("Base image configured");
  } else {
    criticalIssues.push("Base image missing");
  }

  if (/^WORKDIR\s+/im.test(dockerContent)) {
    checks.workdir = true;
    score += 15;
    strengths.push("Working directory configured");
  } else {
    warnings.push("WORKDIR not configured");
  }

  if (/^COPY\s+/im.test(dockerContent)) {
    checks.copy = true;
    score += 15;
    strengths.push("Application files copied");
  } else {
    warnings.push("COPY instruction missing");
  }

  if (/^RUN\s+/im.test(dockerContent)) {
    checks.install = true;
    score += 15;
    strengths.push("Build steps detected");
  } else {
    warnings.push("RUN instruction missing");
  }

  if (/^EXPOSE\s+/im.test(dockerContent)) {
    checks.expose = true;
    score += 10;
    strengths.push("Container port exposed");
  } else {
    warnings.push("EXPOSE instruction missing");
  }

  if (/^(CMD|ENTRYPOINT)\s+/im.test(dockerContent)) {
    checks.cmd = true;
    score += 15;
    strengths.push("Startup command configured");
  } else {
    criticalIssues.push("No CMD or ENTRYPOINT found");
  }

  const fromCount =
    (dockerContent.match(/^FROM\s+/gim) || []).length;

  if (fromCount > 1) {
    checks.multiStage = true;
    score += 10;
    strengths.push("Multi-stage Docker build detected");
  } else {
    warnings.push(
      "Dockerfile is not using a multi-stage build"
    );
  }

  return {
    score,
    checks,
    strengths,
    warnings,
    criticalIssues,
  };
}

async function analyzeWorkflowQuality(contents) {
  const workflowFiles = contents.filter(
    (file) =>
      file.path.startsWith(".github/workflows/") &&
      (file.name.endsWith(".yml") ||
        file.name.endsWith(".yaml"))
  );

  if (workflowFiles.length === 0) {
    return {
      score: 0,

      checks: {
        workflowFiles: false,
      },

      strengths: [],
      warnings: [],
      criticalIssues: [
        "No GitHub Actions workflows found",
      ],
    };
  }

  let score = 20;

  const strengths = [];
  const warnings = [];
  const criticalIssues = [];

  const checks = {
    workflowFiles: true,
    build: false,
    test: false,
    lint: false,
    deploy: false,
  };

  let workflowContent = "";

  for (const workflow of workflowFiles) {
    const content =
      await fileDownloader.downloadFileContent(
        workflow.downloadUrl
      );

    workflowContent += "\n" + content.toLowerCase();
  }

  if (workflowContent.includes("build")) {
    checks.build = true;
    score += 20;
    strengths.push("Build workflow detected");
  } else {
    warnings.push("No build workflow detected");
  }

  if (
    workflowContent.includes("test") ||
    workflowContent.includes("jest") ||
    workflowContent.includes("vitest") ||
    workflowContent.includes("mocha")
  ) {
    checks.test = true;
    score += 20;
    strengths.push("Test workflow detected");
  } else {
    warnings.push("No test workflow detected");
  }

  if (
    workflowContent.includes("lint") ||
    workflowContent.includes("eslint")
  ) {
    checks.lint = true;
    score += 20;
    strengths.push("Lint workflow detected");
  } else {
    warnings.push("No lint workflow detected");
  }

  if (
    workflowContent.includes("deploy") ||
    workflowContent.includes("release")
  ) {
    checks.deploy = true;
    score += 20;
    strengths.push("Deployment workflow detected");
  } else {
    warnings.push("No deployment workflow detected");
  }

  return {
    score,
    checks,
    strengths,
    warnings,
    criticalIssues,
  };
}

function analyzeLockFiles(contents) {
  const packageLock = contents.find(
    (file) => file.name === "package-lock.json"
  );

  const yarnLock = contents.find(
    (file) => file.name === "yarn.lock"
  );

  const pnpmLock = contents.find(
    (file) => file.name === "pnpm-lock.yaml"
  );

  const bunLock = contents.find(
    (file) => file.name === "bun.lockb"
  );

  let score = 0;

  const strengths = [];
  const warnings = [];
  const criticalIssues = [];

  const checks = {
    packageLock: !!packageLock,
    yarnLock: !!yarnLock,
    pnpmLock: !!pnpmLock,
    bunLock: !!bunLock,
  };

  if (packageLock) {
    score = 100;
    strengths.push("package-lock.json detected");
  }

  if (yarnLock) {
    score = 100;
    strengths.push("yarn.lock detected");
  }

  if (pnpmLock) {
    score = 100;
    strengths.push("pnpm-lock.yaml detected");
  }

  if (bunLock) {
    score = 100;
    strengths.push("bun.lockb detected");
  }

  if (score === 0) {
    criticalIssues.push(
      "No dependency lock file found"
    );
  }

  return {
    score,
    checks,
    strengths,
    warnings,
    criticalIssues,
  };
}

function analyzeRuntimeConfiguration(contents) {
  const nvmrc = contents.find(
    (file) => file.name === ".nvmrc"
  );

  const nodeVersion = contents.find(
    (file) => file.name === ".node-version"
  );

  const pythonVersion = contents.find(
    (file) => file.name === ".python-version"
  );

  const javaVersion = contents.find(
    (file) => file.name === ".java-version"
  );

  const rubyVersion = contents.find(
    (file) => file.name === ".ruby-version"
  );

  const toolVersions = contents.find(
    (file) => file.name === ".tool-versions"
  );

  let score = 0;

  const strengths = [];
  const warnings = [];
  const criticalIssues = [];

  const checks = {
    nodeVersion: false,
    pythonVersion: false,
    javaVersion: false,
    rubyVersion: false,
    toolVersions: false,
  };

  if (nvmrc || nodeVersion) {
    checks.nodeVersion = true;
    score += 40;
    strengths.push("Node.js runtime version is pinned");
  }

  if (pythonVersion) {
    checks.pythonVersion = true;
    score += 20;
    strengths.push("Python runtime version is pinned");
  }

  if (javaVersion) {
    checks.javaVersion = true;
    score += 20;
    strengths.push("Java runtime version is pinned");
  }

  if (rubyVersion) {
    checks.rubyVersion = true;
    score += 10;
    strengths.push("Ruby runtime version is pinned");
  }

  if (toolVersions) {
    checks.toolVersions = true;
    score += 10;
    strengths.push("asdf runtime configuration detected");
  }

  if (score === 0) {
    warnings.push(
      "No runtime version configuration found"
    );
  }

  return {
    score,
    checks,
    strengths,
    warnings,
    criticalIssues,
  };
}

module.exports = {
  analyzeInfrastructure,
  analyzeConfiguration,
  analyzeBuildReadiness,
  analyzeCiCd,
  analyzeDeployment,
  saveDeploymentReport,
  analyzeDeploymentPlatforms,
  analyzeDockerfileQuality,
  analyzeWorkflowQuality,
  analyzeLockFiles,
  analyzeRuntimeConfiguration
};
