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
    dependencyFiles: [
      "pom.xml",
      "build.gradle",
      "build.gradle.kts",
    ],
  },

  ".NET": {
    dependencyFiles: [
      ".csproj",
      ".sln",
      "packages.config",
    ],
  },

  Go: {
    dependencyFiles: [
      "go.mod",
      "go.sum",
    ],
  },

  Rust: {
    dependencyFiles: [
      "Cargo.toml",
      "Cargo.lock",
    ],
  },

  PHP: {
    dependencyFiles: [
      "composer.json",
      "composer.lock",
    ],
  },

  Ruby: {
    dependencyFiles: [
      "Gemfile",
      "Gemfile.lock",
    ],
  },

  Flutter: {
    dependencyFiles: [
      "pubspec.yaml",
      "pubspec.lock",
    ],
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

module.exports = {
  UNIVERSAL_PATTERNS,
  TECHNOLOGY_RULES,
  INFRASTRUCTURE_FILES,
  DOCUMENTATION_FILES,
};