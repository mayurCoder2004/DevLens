const { Queue } = require("bullmq");
const connection = require("../config/redis");

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

module.exports = analysisQueue;