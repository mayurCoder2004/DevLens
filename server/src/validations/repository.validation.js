const { z } = require("zod");

const repositoryIdSchema = {
  params: z.object({
    repositoryId: z.uuid("Invalid repository ID"),
  }),
};

const pullRequestSchema = {
  params: z.object({
    repositoryId: z.uuid("Invalid repository ID"),
    prNumber: z.coerce.number().int().positive("Invalid pull request number"),
  }),
};

module.exports = {
  repositoryIdSchema,
  pullRequestSchema
};