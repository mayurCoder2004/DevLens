const { z } = require("zod");

const repositoryIdSchema = {
  params: z.object({
    id: z.uuid("Invalid repository ID"),
  }),
};

module.exports = {
  repositoryIdSchema,
};