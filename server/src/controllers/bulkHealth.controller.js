const {
  analyzeAllRepositories,
} = require(
  "../services/bulkHealth.service"
);

const analyzeAllHealth =
  async (req, res) => {
    try {
        
      const result =
        await analyzeAllRepositories(
          req.user.userId
        );

      return res.json({
        success: true,
        data: result,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

module.exports = {
  analyzeAllHealth,
};