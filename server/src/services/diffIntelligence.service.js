const normalizeText = (value = "") =>
  String(value)
    .replace(/\r/g, "")
    .toLowerCase();

const countPatchLines = (patch = "") => {
  const lines = String(patch).split("\n");

  let additions = 0;
  let deletions = 0;

  for (const line of lines) {
    if (line.startsWith("+++") || line.startsWith("---")) {
      continue;
    }

    if (line.startsWith("+")) {
      additions += 1;
    } else if (line.startsWith("-")) {
      deletions += 1;
    }
  }

  return {
    additions,
    deletions,
  };
};

const detectChangeTypes = (file = {}) => {
  const filename = normalizeText(file.filename);
  const patch = normalizeText(file.patch);

  const types = new Set();

  // Frontend
  if (
    /\.(jsx|tsx|vue|svelte)$/.test(filename) ||
    /(^|\/)(components?|pages?|views?|hooks?|contexts?)(\/|$)/.test(
      filename,
    )
  ) {
    types.add("Frontend");
  }

  // State Management
  if (
    /usestate\s*\(/.test(patch) ||
    /useeffect\s*\(/.test(patch) ||
    /usememo\s*\(/.test(patch) ||
    /usecallback\s*\(/.test(patch) ||
    /usecontext\s*\(/.test(patch) ||
    /redux|zustand|mobx|recoil|context/.test(patch)
  ) {
    types.add("State Management");
  }

  // API Interaction
  if (
    /fetch\s*\(/.test(patch) ||
    /axios/.test(patch) ||
    /apifetch/.test(patch) ||
    /https?:\/\//.test(patch) ||
    /\/api\//.test(patch)
  ) {
    types.add("API Interaction");
  }

  // User Interaction
  if (
    /onclick\s*=/.test(patch) ||
    /onchange\s*=/.test(patch) ||
    /onsubmit\s*=/.test(patch) ||
    /onkeydown\s*=/.test(patch) ||
    /navigator\.share/.test(patch) ||
    /button/.test(patch)
  ) {
    types.add("User Interaction");
  }

  // Authentication
  if (
    /auth/.test(filename) ||
    /login/.test(filename) ||
    /session/.test(filename) ||
    /jwt/.test(filename) ||
    /oauth/.test(filename) ||
    /authorization/.test(patch) ||
    /bearer/.test(patch)
  ) {
    types.add("Authentication");
  }

  // Database
  if (
    /prisma/.test(filename) ||
    /schema\.prisma$/.test(filename) ||
    /(^|\/)(models?|database|db|repositories?)(\/|\.|$)/.test(
      filename,
    ) ||
    /prisma\.|sequelize|mongoose|typeorm/.test(patch)
  ) {
    types.add("Database");
  }

  // Dependencies
  if (
    /(^|\/)package(-lock)?\.json$/.test(filename) ||
    /(^|\/)(yarn\.lock|pnpm-lock\.yaml|requirements\.txt|pom\.xml)$/.test(
      filename,
    ) ||
    /npm install|npm uninstall|dependencies|devdependencies/.test(
      patch,
    )
  ) {
    types.add("Dependencies");
  }

  // Infrastructure
  if (
    /dockerfile/.test(filename) ||
    /docker-compose/.test(filename) ||
    /(^|\/)\.github\/workflows\//.test(filename) ||
    /(^|\/)(kubernetes|k8s|terraform|deployment|deploy)(\/|\.|$)/.test(
      filename,
    )
  ) {
    types.add("Infrastructure");
  }

  // Testing
  if (
    /\.(test|spec)\.[a-z0-9]+$/.test(filename) ||
    /(^|\/)(__tests__|tests?)(\/|$)/.test(filename) ||
    /describe\s*\(|it\s*\(|test\s*\(/.test(patch)
  ) {
    types.add("Testing");
  }

  // Documentation
  if (
    /\.md$/.test(filename) ||
    /(^|\/)docs?(\/|$)/.test(filename)
  ) {
    types.add("Documentation");
  }

  // Refactoring
  if (
    /refactor|rename|cleanup/.test(patch) ||
    file.status === "renamed"
  ) {
    types.add("Refactoring");
  }

  return [...types];
};

const generateObservations = (file, changeTypes) => {
  const observations = [];

  if (changeTypes.includes("Frontend")) {
    observations.push(
      "Frontend application code was modified.",
    );
  }

  if (changeTypes.includes("State Management")) {
    observations.push(
      "State management logic was modified.",
    );
  }

  if (changeTypes.includes("API Interaction")) {
    observations.push(
      "API request or network interaction logic was modified.",
    );
  }

  if (changeTypes.includes("User Interaction")) {
    observations.push(
      "User interaction behavior was modified.",
    );
  }

  if (changeTypes.includes("Authentication")) {
    observations.push(
      "Authentication or authorization logic may be affected.",
    );
  }

  if (changeTypes.includes("Database")) {
    observations.push(
      "Database-related logic or schema was modified.",
    );
  }

  if (changeTypes.includes("Dependencies")) {
    observations.push(
      "Project dependencies were modified.",
    );
  }

  if (changeTypes.includes("Infrastructure")) {
    observations.push(
      "Infrastructure or deployment configuration was modified.",
    );
  }

  if (changeTypes.includes("Testing")) {
    observations.push(
      "Testing-related code was modified.",
    );
  }

  if (changeTypes.includes("Documentation")) {
    observations.push(
      "Documentation was modified.",
    );
  }

  if (changeTypes.includes("Refactoring")) {
    observations.push(
      "The change contains indicators of refactoring or restructuring.",
    );
  }

  const patchStats = countPatchLines(file.patch);

  if (patchStats.additions > 200) {
    observations.push(
      "A large amount of new code was introduced in this file.",
    );
  }

  if (patchStats.deletions > 100) {
    observations.push(
      "A substantial amount of existing code was removed.",
    );
  }

  return observations;
};

const analyzeFileDiff = (file = {}) => {
  const changeTypes = detectChangeTypes(file);

  return {
    filename: file.filename,
    status: file.status,
    additions: file.additions || 0,
    deletions: file.deletions || 0,
    changes: file.changes || 0,
    changeTypes,
    observations: generateObservations(
      file,
      changeTypes,
    ),
  };
};

const analyzeDiffIntelligence = (files = []) => {
  const analyzedFiles = files.map(analyzeFileDiff);

  const changeTypes = [
    ...new Set(
      analyzedFiles.flatMap(
        (file) => file.changeTypes,
      ),
    ),
  ];

  const observations = [
    ...new Set(
      analyzedFiles.flatMap(
        (file) => file.observations,
      ),
    ),
  ];

  const statistics = {
    filesAnalyzed: analyzedFiles.length,

    filesWithFrontendChanges:
      analyzedFiles.filter(
        (file) =>
          file.changeTypes.includes("Frontend"),
      ).length,

    filesWithStateChanges:
      analyzedFiles.filter(
        (file) =>
          file.changeTypes.includes(
            "State Management",
          ),
      ).length,

    filesWithApiChanges:
      analyzedFiles.filter(
        (file) =>
          file.changeTypes.includes(
            "API Interaction",
          ),
      ).length,

    filesWithUserInteractionChanges:
      analyzedFiles.filter(
        (file) =>
          file.changeTypes.includes(
            "User Interaction",
          ),
      ).length,

    filesWithAuthenticationChanges:
      analyzedFiles.filter(
        (file) =>
          file.changeTypes.includes(
            "Authentication",
          ),
      ).length,

    filesWithDatabaseChanges:
      analyzedFiles.filter(
        (file) =>
          file.changeTypes.includes("Database"),
      ).length,

    filesWithDependencyChanges:
      analyzedFiles.filter(
        (file) =>
          file.changeTypes.includes(
            "Dependencies",
          ),
      ).length,

    filesWithInfrastructureChanges:
      analyzedFiles.filter(
        (file) =>
          file.changeTypes.includes(
            "Infrastructure",
          ),
      ).length,

    filesWithTestingChanges:
      analyzedFiles.filter(
        (file) =>
          file.changeTypes.includes("Testing"),
      ).length,

    filesWithDocumentationChanges:
      analyzedFiles.filter(
        (file) =>
          file.changeTypes.includes(
            "Documentation",
          ),
      ).length,
  };

  return {
    changeTypes,
    observations,
    statistics,
    files: analyzedFiles,
  };
};

module.exports = {
  analyzeDiffIntelligence,
};
