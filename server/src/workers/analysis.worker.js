const { Worker } = require("bullmq");
const connection = require("../config/redis");

const analysisWorker = new Worker(
  "repository-analysis",
  async (job) => {
    console.log("==================================");
    console.log("Processing Job");
    console.log("Job ID:", job.id);
    console.log("Job Name:", job.name);
    console.log("Job Data:", job.data);

    // Simulate a long-running task
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log("Job Completed!");
    console.log("==================================");

    return {
      success: true,
    };
  },
  {
    connection,
  }
);

analysisWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully.`);
});

analysisWorker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});

console.log("Analysis Worker is listening for jobs...");