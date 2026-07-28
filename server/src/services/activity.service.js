const prisma = require("../config/prisma");

const getRecentActivities = async (
  userId,
  {
    page = 1,
    limit = 20,
  } = {},
) => {
  const skip = (page - 1) * limit;

  const [activities, total] = await Promise.all([
    prisma.activity.findMany({
      where: {
        userId,
      },

      include: {
        repository: {
          select: {
            id: true,
            name: true,
            owner: true,
            language: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      skip,

      take: limit,
    }),

    prisma.activity.count({
      where: {
        userId,
      },
    }),
  ]);

  return {
    activities,

    pagination: {
      page,

      limit,

      total,

      totalPages: Math.ceil(total / limit),
    },
  };
};

module.exports = {
  getRecentActivities,
};