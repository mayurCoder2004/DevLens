const { ZodError } = require("zod");

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = {};

      if (schema.body) {
        validatedData.body = schema.body.parse(req.body);
      }

      if (schema.params) {
        validatedData.params = schema.params.parse(req.params);
      }

      if (schema.query) {
        validatedData.query = schema.query.parse(req.query);
      }

      req.validatedData = validatedData;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      next(error);
    }
  };
};

module.exports = validate;