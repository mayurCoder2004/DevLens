const { Job } = require("bullmq");

const analysisQueue = require("../queues/analysis.queue");

class JobStatusService {
  async getJobStatus(jobId) {
    const job = await Job.fromId(analysisQueue, jobId);

    if (!job) {
      throw new Error("Job not found");
    }

    const state = await job.getState();

    return {
      jobId: job.id,
      state,
    };
  }
}

module.exports = new JobStatusService();
