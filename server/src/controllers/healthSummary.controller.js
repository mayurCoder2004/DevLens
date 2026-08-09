const { getHealthSummary } = require("../services/healthSummary.service");

const getSummary = async (req, res) => {
  try {
    const summary = await getHealthSummary(req.user.userId);

    return res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Failed to get health summary:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSummary,
};
