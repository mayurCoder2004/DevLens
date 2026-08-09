const { ZodError } = require("zod");

const validate = (schema) => {
  return (req, res, next) => {
    const validatedData = {};

    if (schema.body) {
      const result = schema.body.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      validatedData.body = result.data;
    }

    if (schema.params) {
      const result = schema.params.safeParse(req.params);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      validatedData.params = result.data;
    }

    if (schema.query) {
      const result = schema.query.safeParse(req.query);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      validatedData.query = result.data;
    }

    req.validatedData = validatedData;

    next();
  };
};

module.exports = validate;
