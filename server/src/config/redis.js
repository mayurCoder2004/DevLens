const IORedis = require("ioredis");
const env = require("./env");
const logger = require("./logger");

const connection = new IORedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,

  retryStrategy(times) {
    if (times > 10) {
      logger.error(
        "Redis connection failed after 10 retries. Running without Redis.",
      );

      return null;
    }

    const delay = Math.min(times * 1000, 5000);

    logger.warn(`Redis connection attempt ${times}. Retrying in ${delay}ms...`);

    return delay;
  },
});

connection.on("connect", () => {
  logger.info("Connected to Redis");
});

connection.on("ready", () => {
  logger.info("Redis is ready");
});

connection.on("error", (error) => {
  logger.error(`Redis error: ${error.message}`);
});

connection.on("close", () => {
  logger.warn("Redis connection closed");
});

const isRedisAvailable = () => {
  return connection.status === "ready";
};

module.exports = {
  connection,
  isRedisAvailable,
};
