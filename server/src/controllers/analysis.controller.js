const analysisQueue = require("../queues/analysis.queue");

exports.analyzeRepository = async (req, res) => {
  try {
    const { repoId } = req.params;

    const job = await analysisQueue.add("analyze-repository", {
      repositoryId: repoId,
    });

    return res.status(202).json({
      success: true,
      message: "Repository analysis queued successfully.",
      jobId: job.id,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
