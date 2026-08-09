const { createLogger, format, transports } = require("winston");
const env = require("./env");

const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const redactSecrets = (value) => {
  let output = String(value);

  [
    env.DATABASE_URL,
    env.REDIS_URL,
    env.JWT_SECRET,
    env.GEMINI_API_KEY,
    env.OPENROUTER_API_KEY,
  ]
    .filter(Boolean)
    .forEach((secret) => {
      output = output.replace(
        new RegExp(escapeRegex(secret), "g"),
        "[REDACTED]"
      );
    });

  return output
    .replace(
      /(authorization["']?\s*[:=]\s*["']?\s*(?:Bearer|token)\s+)[^"',\s}]+/gi,
      "$1[REDACTED]"
    )
    .replace(
      /((?:access|refresh|github|firebase)?token["']?\s*[:=]\s*["']?)[^"',\s}]+/gi,
      "$1[REDACTED]"
    )
    .replace(
      /((?:api[_-]?key|secret|password|credential)s?["']?\s*[:=]\s*["']?)[^"',\s}]+/gi,
      "$1[REDACTED]"
    )
    .replace(/(rediss?:\/\/[^:\s]+:)[^@\s]+@/gi, "$1[REDACTED]@")
    .replace(/(postgres(?:ql)?:\/\/[^:\s]+:)[^@\s]+@/gi, "$1[REDACTED]@");
};

const logger = createLogger({
  level: env.NODE_ENV === "production" ? "info" : "debug",

  format: format.combine(
    env.NODE_ENV !== "production"
      ? format.colorize()
      : format.uncolorize(),

    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),

    format.errors({
      stack: true,
    }),

    format.printf(({ timestamp, level, message, stack }) => {
      const safeStack = stack ? redactSecrets(stack) : null;
      const safeMessage = redactSecrets(message);

      return stack
        ? `[${timestamp}] ${level.toUpperCase()}: ${safeStack}`
        : `[${timestamp}] ${level.toUpperCase()}: ${safeMessage}`;
    })
  ),

  transports: [
    new transports.Console(),
  ],

  exceptionHandlers: [
    new transports.Console(),
  ],

  rejectionHandlers: [
    new transports.Console(),
  ],

  exitOnError: false,
});

module.exports = logger;
