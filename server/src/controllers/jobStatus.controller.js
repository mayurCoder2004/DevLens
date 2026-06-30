const jobStatusService = require("../services/jobStatus.service");

exports.getJobStatus = async (req, res) => {
  try {
    const { jobId } = req.params;

    const status = await jobStatusService.getJobStatus(jobId);

    return res.status(200).json({
      success: true,
      data: status,
    });
  } catch (error) {
    console.error(error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
