const asyncHandler = require("../utils/asyncHandler");

const {
  getChangeImpactForPullRequest,
} = require("../services/changeImpact/changeImpactApi.service");

const getChangeImpact = asyncHandler(
  async (req, res) => {
    const {
      repositoryId,
      prNumber,
    } = req.validatedData.params;

    const result =
      await getChangeImpactForPullRequest({
        repositoryId,
        prNumber,
      });

    if (!result) {
      return res.status(404).json({
        success: false,
        message:
          "Pull request analysis not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  },
);

module.exports = {
  getChangeImpact,
};