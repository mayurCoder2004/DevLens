const prisma = require("../config/prisma");
const technicalDebtService = require(
  "../services/technicalDebt/technicalDebt.service"
);

class TechnicalDebtController {
  async analyze(req, res) {
    try {
      const { repositoryId } = req.params;

      const repository =
        await prisma.repository.findUnique({
          where: {
            id: repositoryId,
          },
        });

      if (!repository) {
        return res.status(404).json({
          success: false,
          message: "Repository not found",
        });
      }

      const user =
        await prisma.user.findUnique({
          where: {
            id: repository.userId,
          },
        });

      const report =
        await technicalDebtService.analyzeTechnicalDebt(
          repository.owner,
          repository.name,
          user.githubToken
        );

      await technicalDebtService.saveTechnicalDebt(
        repositoryId,
        report
      );

      res.json({
        success: true,
        data: report,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Technical debt analysis failed",
      });
    }
  }

  async getByRepository(req, res) {
    try {
      const { repositoryId } = req.params;

      const debt =
        await prisma.repositoryTechnicalDebt.findUnique(
          {
            where: {
              repositoryId,
            },
          }
        );

      if (!debt) {
        return res.status(404).json({
          success: false,
          message:
            "Technical debt analysis not found",
        });
      }

      res.json({
        success: true,
        data: debt,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch technical debt analysis",
      });
    }
  }
}

module.exports =
  new TechnicalDebtController();