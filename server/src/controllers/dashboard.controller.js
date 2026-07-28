const dashboardService = require("../services/dashboard/dashboard.service");

const getDashboardOverview = async (req, res, next) => {
  try {
    const overview = await dashboardService.getDashboardOverview(
      req.user.id
    );

    return res.status(200).json({
      success: true,
      data: overview,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardOverview,
};