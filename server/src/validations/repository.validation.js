const { z } = require("zod");

const repositoryIdSchema = {
  params: z
    .object({
      repositoryId: z.string().cuid("Invalid repository ID"),
    })
    .strict(),
};

const pullRequestSchema = {
  params: z
    .object({
      repositoryId: z.string().cuid("Invalid repository ID"),
      prNumber: z.coerce
        .number()
        .int("Pull request number must be an integer")
        .positive("Pull request number must be greater than 0"),
    })
    .strict(),
};

module.exports = {
  repositoryIdSchema,
  pullRequestSchema,
};