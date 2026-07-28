const { getActivitySummary } = require("../services/activitySummary.service");
const activityService = require("../services/activity.service");

const getSummary = async (req, res) => {
  try {
    const summary = await getActivitySummary(req.user.userId);

    return res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRecentActivities = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await activityService.getRecentActivities(
      req.user.userId,
      {
        page,
        limit,
      }
    );

    return res.json({
      success: true,
      data: result.activities,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSummary,
  getRecentActivities,
};