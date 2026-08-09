const analysisQueue = require("../queues/analysis.queue");

const repositoryAnalysisService = require("../services/repositoryAnalysis.service");

const { isRedisAvailable } = require("../config/redis");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// ============================
// Analyze Repository
// ============================

const analyzeRepository = asyncHandler(async (req, res) => {
  const { repositoryId } = req.validatedData.params;

  // Development mode (Redis unavailable)
  if (!isRedisAvailable()) {
    await repositoryAnalysisService.analyzeRepository(repositoryId);

    return res.status(200).json({
      success: true,
      message: "Repository analyzed successfully.",
    });
  }

  // Production mode (BullMQ)
  const job = await analysisQueue.add("analyze-repository", {
    repositoryId,
  });

  if (!job) {
    throw new ApiError(500, "Failed to queue repository analysis.");
  }

  return res.status(202).json({
    success: true,
    message: "Repository analysis queued successfully.",
    jobId: job.id,
  });
});

module.exports = {
  analyzeRepository,
};
