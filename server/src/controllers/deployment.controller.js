const prisma = require("../config/prisma");
const deploymentService = require("../services/deployment/deploymentService");

async function analyzeDeployment(req, res) {
  try {
    const repository = await prisma.repository.findUnique({
      where: {
        id: req.params.id,
      },

      include: {
        user: true,
      },
    });

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found",
      });
    }

    const report = await deploymentService.analyzeRepositoryDeployment(
      repository,
      repository.user.githubToken,
    );

    return res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze deployment",
    });
  }
}

async function getDeploymentReport(req, res) {
  try {
    const report = await prisma.repositoryDeployment.findUnique({
      where: {
        repositoryId: req.params.id,
      },
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Deployment report not found",
      });
    }

    return res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch deployment report",
    });
  }
}

module.exports = {
  analyzeDeployment,
  getDeploymentReport,
};
