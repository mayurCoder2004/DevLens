const architecturePersistenceService = require("../services/architecture/architecturePersistence.service");

const analyzeRepositoryArchitecture = async (req, res) => {
  try {
    const { repositoryId } = req.params;

    const result =
      await architecturePersistenceService.analyzeAndStore(repositoryId);

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Failed to analyze repository architecture:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRepositoryArchitecture = async (req, res) => {
  try {
    const { repositoryId } = req.params;

    const architecture =
      await architecturePersistenceService.getArchitecture(repositoryId);

    return res.json({
      success: true,
      data: architecture,
    });
  } catch (error) {
    console.error("Failed to get repository architecture:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeRepositoryArchitecture,
  getRepositoryArchitecture,
};
