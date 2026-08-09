const {
  getPortfolioRecommendations,
} = require("../services/portfolioRecommendations.service");

const getRecommendations = async (req, res) => {
  try {
    const recommendations = await getPortfolioRecommendations(req.user.userId);

    return res.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    console.error("Failed to get portfolio recommendations:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRecommendations,
};
