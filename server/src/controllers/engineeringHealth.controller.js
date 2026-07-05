const engineeringHealthService = require("../services/engineeringHealth.service");

const engineeringHealthController = {
  async getEngineeringHealth(req, res) {
    try {
      const { repositoryId } = req.params;

      const engineeringHealth =
        await engineeringHealthService.getEngineeringHealth(
          repositoryId
        );

      return res.status(200).json({
        success: true,
        data: engineeringHealth,
      });
    } catch (error) {
  console.error("Engineering Health Error:", error);

  if (error.message === "Repository not found") {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
  success: false,
  message: "Failed to fetch engineering health.",
  error:
    process.env.NODE_ENV === "development"
      ? error.message
      : undefined,
});
}
  },
};

module.exports = engineeringHealthController;