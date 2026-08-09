const {
  getPortfolioInsights,
} = require("../services/portfolioInsights.service");

const getInsights = async (req, res) => {
  try {
    const insights = await getPortfolioInsights(req.user.userId);

    return res.json({
      success: true,
      data: insights,
    });
  } catch (error) {
    console.error("Failed to get portfolio insights:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getInsights,
};
