const { ZodError } = require("zod");
const { Prisma } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const logger = require("../config/logger");
const env = require("../config/env");

const errorHandler = (err, req, res, next) => {
  // Log every unexpected error
  logger.error(err.stack || err.message);

  // ============================
  // Zod Validation Errors
  // ============================

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // ============================
  // Prisma Errors
  // ============================

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(409).json({
          success: false,
          message: "Resource already exists",
        });

      case "P2025":
        return res.status(404).json({
          success: false,
          message: "Requested resource not found",
        });

      default:
        return res.status(400).json({
          success: false,
          message: "Database request failed",
        });
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      success: false,
      message: "Invalid request data",
    });
  }

  // ============================
  // JWT Errors
  // ============================

  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({
      success: false,
      message: "Authentication token has expired",
    });
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token",
    });
  }

  // ============================
  // Custom API Errors
  // ============================

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // ============================
  // Unknown Errors
  // ============================

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    ...(env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

module.exports = errorHandler;
