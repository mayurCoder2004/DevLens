const prisma = require("../config/prisma");
const engineeringHealthService = require("../services/engineeringHealth.service");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// ============================
// Get Engineering Health
// ============================

const getEngineeringHealth = asyncHandler(async (req, res) => {
  const { repositoryId } = req.validatedData.params;

  // Verify repository exists and belongs to the authenticated user
  const repository = await prisma.repository.findFirst({
    where: {
      id: repositoryId,
      userId: req.user.userId,
    },
  });

  if (!repository) {
    throw new ApiError(404, "Repository not found");
  }

  const engineeringHealth =
    await engineeringHealthService.getEngineeringHealth(repositoryId);

  if (!engineeringHealth) {
    throw new ApiError(404, "Engineering health not found");
  }

  return res.status(200).json({
    success: true,
    data: engineeringHealth,
  });
});

module.exports = {
  getEngineeringHealth,
};
