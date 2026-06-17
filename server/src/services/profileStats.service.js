class ProfileStatsService {
  async calculate(userId, prisma) {
    const repositories = await prisma.repository.findMany({
      where: {
        userId,
      },
      include: {
        analytics: true,
        techStack: true,
      },
    });

    return repositories;
  }
}

module.exports = new ProfileStatsService();
