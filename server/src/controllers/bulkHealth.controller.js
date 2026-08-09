const { analyzeAllRepositories } = require("../services/bulkHealth.service");

const analyzeAllHealth = async (req, res) => {
  try {
    const result = await analyzeAllRepositories(req.user.userId);

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Failed to analyze all repository health:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeAllHealth,
};
