const analysisQueue = require("../queues/analysis.queue");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// ============================
// Analyze Repository
// ============================

const analyzeRepository = asyncHandler(async (req, res) => {
  const { repositoryId } = req.validatedData.params;

  const job = await analysisQueue.add("analyze-repository", {
    repositoryId,
  });

  if (!job) {
    throw new ApiError(500, "Failed to queue repository analysis");
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