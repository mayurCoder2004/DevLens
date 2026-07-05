/**
 * Universal patterns that are considered high-risk
 * regardless of programming language.
 */
const UNIVERSAL_PATTERNS = [
  // Authentication & Security
  "auth",
  "authentication",
  "security",
  "jwt",
  "oauth",
  "login",

  // Authorization
  "permission",
  "permissions",
  "role",
  "roles",
  "acl",

  // Middleware
  "middleware",
  "interceptor",
  "filter",
  "guard",

  // Configuration
  "config",
  "configuration",
  ".env",

  // Database
  "database",
  "db",
  "schema",
  "migration",
  "migrations",
  "model",
  "models",

  // API
  "controller",
  "controllers",
  "route",
  "routes",
  "api",

  // Services
  "service",
  "services",
];

/**
 * Technology-specific rules.
 * These are activated only if the repository contains
 * the corresponding technology.
 */
const TECHNOLOGY_RULES = {
  "Node.js": {
    dependencyFiles: [
      "package.json",
      "package-lock.json",
      "pnpm-lock.yaml",
      "yarn.lock",
      "bun.lockb",
    ],
  },

  Python: {
    dependencyFiles: [
      "requirements.txt",
      "pyproject.toml",
      "Pipfile",
      "poetry.lock",
    ],
  },

  Java: {
    dependencyFiles: ["pom.xml", "build.gradle", "build.gradle.kts"],
  },

  ".NET": {
    dependencyFiles: [".csproj", ".sln", "packages.config"],
  },

  Go: {
    dependencyFiles: ["go.mod", "go.sum"],
  },

  Rust: {
    dependencyFiles: ["Cargo.toml", "Cargo.lock"],
  },

  PHP: {
    dependencyFiles: ["composer.json", "composer.lock"],
  },

  Ruby: {
    dependencyFiles: ["Gemfile", "Gemfile.lock"],
  },

  Flutter: {
    dependencyFiles: ["pubspec.yaml", "pubspec.lock"],
  },
};

/**
 * Infrastructure-related files.
 */
const INFRASTRUCTURE_FILES = [
  "Dockerfile",
  "docker-compose.yml",
  "docker-compose.yaml",

  ".github/workflows",

  "vercel.json",
  "netlify.toml",

  "render.yaml",
  "railway.json",
  "fly.toml",

  "terraform",

  "kubernetes",
  "helm",

  "nginx.conf",
];

/**
 * Documentation files.
 * Changes to these generally reduce PR risk.
 */
const DOCUMENTATION_FILES = [
  "README",
  "CHANGELOG",
  "LICENSE",
  "docs/",
  "documentation/",
];

const RISK_WEIGHTS = {
  critical: {
    perFile: 10,
    max: 40,
  },

  infrastructure: {
    perFile: 10,
    max: 20,
  },

  dependency: {
    perFile: 5,
    max: 15,
  },

  fileCount: {
    thresholds: [
      { min: 50, score: 15 },
      { min: 20, score: 10 },
      { min: 10, score: 5 },
    ],
  },

  documentation: {
    reductionPerFile: 2,
    maxReduction: 10,
  },
};

const RISK_LEVELS = [
  {
    min: 75,
    label: "Critical",
    color: "red",
    requiresReview: true,
  },
  {
    min: 50,
    label: "High",
    color: "orange",
    requiresReview: true,
  },
  {
    min: 25,
    label: "Medium",
    color: "yellow",
    requiresReview: true,
  },
  {
    min: 0,
    label: "Low",
    color: "green",
    requiresReview: false,
  },
];

const RECOMMENDATION_RULES = {
  critical: [
    "Review critical application components carefully before merging.",
    "Request review from a senior developer for critical code changes.",
  ],

  dependency: [
    "Verify dependency compatibility and run dependency security checks.",
  ],

  infrastructure: [
    "Validate infrastructure changes in a staging environment before deployment.",
  ],

  highRisk: [
    "Execute a full regression test suite before merging.",
    "Ensure all CI/CD checks pass successfully.",
  ],

  documentationOnly: [
    "Documentation-only changes detected. Minimal engineering risk.",
  ],

  default: ["No major risks detected. Follow the standard review process."],
};

module.exports = {
  UNIVERSAL_PATTERNS,
  TECHNOLOGY_RULES,
  INFRASTRUCTURE_FILES,
  DOCUMENTATION_FILES,
  RISK_WEIGHTS,
  RISK_LEVELS,
  RECOMMENDATION_RULES,
};
