const IORedis = require("ioredis");
const env = require("./env");
const logger = require("./logger");

const connection = new IORedis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  maxRetriesPerRequest: null,

  retryStrategy(times) {
    if (times > 10) {
      logger.error("Redis connection failed after 10 retry attempts.");
      return null; // Stop retrying
    }

    return Math.min(times * 1000, 5000);
  },
});

connection.on("connect", () => {
  logger.info("Connected to Redis");
});

connection.on("ready", () => {
  logger.info("Redis is ready");
});

connection.on("error", (error) => {
  logger.error(`Redis connection failed: ${error.message}`);
});

connection.on("close", () => {
  logger.warn("Redis connection closed");
});

module.exports = connection;