const repositoryReviewSchema = {
  type: "object",

  properties: {
    executiveSummary: {
      type: "object",
      properties: {
        assessment: {
          type: "string",
        },
        engineeringSummary: {
          type: "string",
        },
      },
      required: ["assessment", "engineeringSummary"],
    },

    engineeringScore: {
      type: "object",
      properties: {
        overall: { type: "number" },
        maintainability: { type: "number" },
        security: { type: "number" },
        architecture: { type: "number" },
        testing: { type: "number" },
        documentation: { type: "number" },
        scalability: { type: "number" },
      },
      required: [
        "overall",
        "maintainability",
        "security",
        "architecture",
        "testing",
        "documentation",
        "scalability",
      ],
    },

    strengths: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
        },
        required: ["title", "description"],
      },
    },

    criticalIssues: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          severity: {
            type: "string",
            enum: ["High", "Medium", "Low"],
          },
          description: {
            type: "string",
          },
        },
        required: ["title", "severity", "description"],
      },
    },

    actionPlan: {
      type: "array",
      items: {
        type: "object",
        properties: {
          phase: {
            type: "string",
            enum: ["Immediate", "Short-term", "Long-term"],
          },
          priority: {
            type: "string",
            enum: ["High", "Medium", "Low"],
          },
          estimatedTime: {
            type: "string",
          },
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
          reason: {
            type: "string",
          },
        },
        required: [
          "phase",
          "priority",
          "estimatedTime",
          "title",
          "description",
          "reason",
        ],
      },
    },

    technologyInsights: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          category: { type: "string" },
          insight: { type: "string" },
        },
        required: ["name", "category", "insight"],
      },
    },

    architectureSuggestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          priority: {
            type: "string",
            enum: ["High", "Medium", "Low"],
          },
          recommendation: {
            type: "string",
          },
          benefits: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        required: [
          "title",
          "priority",
          "recommendation",
          "benefits",
        ],
      },
    },
  },

  required: [
    "executiveSummary",
    "engineeringScore",
    "strengths",
    "criticalIssues",
    "actionPlan",
    "technologyInsights",
    "architectureSuggestions",
  ],
};

module.exports = repositoryReviewSchema;