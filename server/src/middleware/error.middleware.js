const { ZodError } = require("zod");
const { Prisma } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const errorHandler = (err, req, res, next) => {
  console.error(err);

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

  // Unique constraint violation
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Resource already exists",
      });
    }

    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Requested resource not found",
      });
    }
  }

  // ============================
  // JWT Errors
  // ============================

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token",
    });
  }

  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({
      success: false,
      message: "Authentication token has expired",
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
  });
};

module.exports = errorHandler;