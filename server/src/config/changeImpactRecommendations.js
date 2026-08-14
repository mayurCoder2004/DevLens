const IMPACT_RECOMMENDATION_RULES = {
  Authentication: {
    actions: [
      {
        title: "Verify login flow",
        description:
          "Verify that users can authenticate successfully after the change.",
      },
      {
        title: "Verify logout flow",
        description:
          "Verify that authentication state is cleared correctly during logout.",
      },
      {
        title: "Verify session validation",
        description:
          "Verify that authenticated sessions remain valid and protected routes behave correctly.",
      },
      {
        title: "Verify OAuth authentication",
        description:
          "Verify OAuth login and callback handling if OAuth is used by the repository.",
      },
    ],
  },

  API: {
    actions: [
      {
        title: "Test affected API endpoints",
        description:
          "Verify that endpoints connected to the changed modules still behave correctly.",
      },
      {
        title: "Verify request validation",
        description:
          "Verify that request validation and error handling remain correct.",
      },
      {
        title: "Verify authentication middleware",
        description:
          "Verify that protected endpoints still enforce authentication and authorization.",
      },
      {
        title: "Run API integration tests",
        description:
          "Run integration tests covering the affected API paths.",
      },
    ],
  },

  Database: {
    actions: [
      {
        title: "Verify affected database queries",
        description:
          "Verify that queries and repository operations connected to the changed modules still work.",
      },
      {
        title: "Run database integration tests",
        description:
          "Run integration tests covering the affected persistence paths.",
      },
      {
        title: "Verify migration compatibility",
        description:
          "Verify that schema or migration changes remain compatible with the application.",
      },
    ],
  },

  Frontend: {
    actions: [
      {
        title: "Verify affected UI flows",
        description:
          "Verify user-facing flows connected to the changed frontend modules.",
      },
      {
        title: "Check component behavior",
        description:
          "Verify that affected components render and behave correctly.",
      },
      {
        title: "Run frontend tests",
        description:
          "Run tests covering the affected components and user flows.",
      },
    ],
  },

  Deployment: {
    actions: [
      {
        title: "Verify production build",
        description:
          "Verify that the application still builds successfully with the deployment changes.",
      },
      {
        title: "Verify container startup",
        description:
          "Verify that affected containers start successfully if container configuration changed.",
      },
      {
        title: "Verify environment configuration",
        description:
          "Verify that required environment variables and runtime configuration remain valid.",
      },
      {
        title: "Run deployment checks",
        description:
          "Run the relevant CI/CD checks before merging the change.",
      },
    ],
  },

  Configuration: {
    actions: [
      {
        title: "Verify configuration compatibility",
        description:
          "Verify that application configuration remains compatible with existing services.",
      },
      {
        title: "Verify environment variables",
        description:
          "Verify that required environment variables are still present and correctly configured.",
      },
    ],
  },

  Testing: {
    actions: [
      {
        title: "Run affected test suites",
        description:
          "Run tests associated with the changed or affected modules.",
      },
      {
        title: "Check test coverage",
        description:
          "Verify that the change does not leave critical affected paths without adequate test coverage.",
      },
    ],
  },
};

module.exports = {
  IMPACT_RECOMMENDATION_RULES,
};