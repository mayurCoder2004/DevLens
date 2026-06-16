const prisma = require("../config/prisma");

exports.getStats = async (req, res) => {

  try {

    const repositories =
      await prisma.repository.findMany({
        include: {
          analytics: true,
          techStack: true
        }
      });

    const totalRepositories =
      repositories.length;

    const totalStars =
      repositories.reduce(
        (sum, repo) =>
          sum + (repo.analytics?.stars || 0),
        0
      );

    const totalForks =
      repositories.reduce(
        (sum, repo) =>
          sum + (repo.analytics?.forks || 0),
        0
      );

    const mostStarredRepo =
      repositories.reduce(
        (maxRepo, currentRepo) => {

          const maxStars =
            maxRepo?.analytics?.stars || 0;

          const currentStars =
            currentRepo?.analytics?.stars || 0;

          return currentStars > maxStars
            ? currentRepo
            : maxRepo;

        },
        repositories[0]
      );

    const languageCount = {};

    repositories.forEach((repo) => {

      const language =
        repo.analytics?.primaryLanguage;

      if (!language) return;

      languageCount[language] =
        (languageCount[language] || 0) + 1;

    });

    const topLanguage =
      Object.keys(languageCount).length
        ? Object.keys(languageCount).reduce(
            (a, b) =>
              languageCount[a] >
              languageCount[b]
                ? a
                : b
          )
        : null;

    const technologyCount = {};

    repositories.forEach((repo) => {

      const technologies =
        repo.techStack?.technologies || [];

      technologies.forEach((tech) => {

        technologyCount[tech] =
          (technologyCount[tech] || 0) + 1;

      });

    });

    const topTechnologies =
      Object.entries(technologyCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([tech]) => tech);

    const uniqueTechnologies =
      Object.keys(technologyCount).length;

    const developerScore =
      totalRepositories * 5 +
      totalStars * 2 +
      uniqueTechnologies * 3;

    return res.json({

      totalRepositories,

      totalStars,

      totalForks,

      mostStarredRepository: {
        name: mostStarredRepo?.name || null,
        stars:
          mostStarredRepo?.analytics?.stars || 0
      },

      topLanguage,

      topTechnologies,

      developerScore

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: error.message
    });

  }
};