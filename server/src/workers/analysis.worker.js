const { Worker } = require("bullmq");
const connection = require("../config/redis");
const repositoryAnalysisService = require("../services/repositoryAnalysis.service");

const analysisWorker = new Worker(
  "repository-analysis",
  async (job) => {
    console.log("==================================");
    console.log("Processing Repository Analysis Job");
    console.log("Job ID:", job.id);
    console.log("Repository ID:", job.data.repositoryId);

    const result = await repositoryAnalysisService.analyzeRepository(
      job.data.repositoryId,
    );

    console.log("Repository analysis completed.");
    console.log("==================================");

    return result;
  },
  {
    connection,
  },
);

analysisWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully.`);
});

analysisWorker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});

console.log("Analysis Worker is listening for jobs...");
