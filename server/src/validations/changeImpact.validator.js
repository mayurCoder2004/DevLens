const { z } = require("zod");

const changeImpactParamsSchema = z.object({
  repositoryId: z
    .string()
    .min(1, "Repository ID is required"),

  prNumber: z.coerce
    .number()
    .int("PR number must be an integer")
    .positive("PR number must be positive"),
});

module.exports = {
  changeImpactParamsSchema,
};