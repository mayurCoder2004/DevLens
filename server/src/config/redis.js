const IORedis = require("ioredis");
const env = require("./env");
const logger = require("./logger");

let redisAvailable = false;

const connection = new IORedis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  maxRetriesPerRequest: null,

  retryStrategy(times) {
    if (times > 10) {
      logger.warn(
        "Redis unavailable. Running without background jobs."
      );

      return null;
    }

    return Math.min(times * 1000, 5000);
  },
});

connection.on("connect", () => {
  logger.info("Connected to Redis");
});

connection.on("ready", () => {
  redisAvailable = true;

  logger.info("Redis is ready");
});

connection.on("error", (error) => {
  redisAvailable = false;

  logger.warn(
    `Redis unavailable: ${error.message}`
  );
});

connection.on("close", () => {
  redisAvailable = false;

  logger.warn("Redis connection closed");
});

module.exports = {
  connection,

  isRedisAvailable: () => redisAvailable,
};