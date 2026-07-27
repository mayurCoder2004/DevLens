const { Worker } = require("bullmq");
const connection = require("../config/redis");
const repositoryAnalysisService = require("../services/repositoryAnalysis.service");
const logger = require("../config/logger");

const analysisWorker = new Worker(
  "repository-analysis",
  async (job) => {
    logger.info(`Processing repository analysis job ${job.id}`);

    if (!job.data?.repositoryId) {
      throw new Error("Repository ID is missing from the job payload.");
    }

    logger.info(`Repository ID: ${job.data.repositoryId}`);

    const result = await repositoryAnalysisService.analyzeRepository(
      job.data.repositoryId
    );

    logger.info(`Repository analysis completed for job ${job.id}`);

    return result;
  },
  {
    connection,
    concurrency: 3,
  }
);

// ===============================
// Worker Events
// ===============================

analysisWorker.on("completed", (job) => {
  logger.info(`Job ${job.id} completed successfully.`);
});

analysisWorker.on("failed", (job, err) => {
  logger.error(
    `Job ${job?.id ?? "unknown"} failed: ${err.stack || err.message}`
  );
});

analysisWorker.on("error", (err) => {
  logger.error(`Worker error: ${err.stack || err.message}`);
});

analysisWorker.on("stalled", (jobId) => {
  logger.warn(`Job ${jobId} has stalled.`);
});

logger.info("Analysis Worker is listening for jobs...");

// ===============================
// Graceful Shutdown
// ===============================

const shutdown = async (signal) => {
  logger.info(`${signal} received. Closing BullMQ worker...`);

  try {
    await analysisWorker.close();
    logger.info("BullMQ worker closed successfully.");
    process.exit(0);
  } catch (err) {
    logger.error(`Failed to close worker: ${err.stack || err.message}`);
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));