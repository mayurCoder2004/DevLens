const { Queue } = require("bullmq");
const connection = require("../config/redis");
const logger = require("../config/logger");

const analysisQueue = new Queue("repository-analysis", {
  connection,

  defaultJobOptions: {
    attempts: 3,

    backoff: {
      type: "exponential",
      delay: 5000,
    },

    removeOnComplete: 100,

    removeOnFail: 50,
  },
});

logger.info("Analysis Queue initialized.");

module.exports = analysisQueue;