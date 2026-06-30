const { Queue } = require("bullmq");
const connection = require("../config/redis");

const analysisQueue = new Queue("repository-analysis", {
  connection,
});

module.exports = analysisQueue;
