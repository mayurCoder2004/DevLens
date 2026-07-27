const { createLogger, format, transports } = require("winston");
const env = require("./env");

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
      return stack
        ? `[${timestamp}] ${level.toUpperCase()}: ${stack}`
        : `[${timestamp}] ${level.toUpperCase()}: ${message}`;
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