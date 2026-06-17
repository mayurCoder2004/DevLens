const calculateActivityScore = (analytics) => {
    if (!analytics) {
  return 0;
}
  let score = 0;

  const lastCommit = new Date(analytics.lastCommitDate);

  const today = new Date();

  const daysSinceCommit = Math.floor(
    (today - lastCommit) / (1000 * 60 * 60 * 24),
  );

  if (daysSinceCommit <= 30) {
    score += 70;
  } else if (daysSinceCommit <= 90) {
    score += 50;
  } else if (daysSinceCommit <= 180) {
    score += 30;
  } else {
    score += 10;
  }

  const contributors = analytics.contributors;

  if (contributors >= 5) {
    score += 30;
  } else if (contributors >= 3) {
    score += 20;
  } else if (contributors >= 2) {
    score += 10;
  } else {
    score += 5;
  }

  return Math.min(score, 100);
};

const calculateDocumentationScore = (filesMetadata) => {
  let score = 0;

  if (filesMetadata.hasReadme) {
    score += 70;
  }

  if (filesMetadata.totalRootFiles >= 5) {
    score += 30;
  }

  return Math.min(score, 100);
};

const calculateMaintenanceScore = (repository, analytics) => {
  let score = 0;

  if (analytics.openIssues <= 5) {
    score += 40;
  } else if (analytics.openIssues <= 20) {
    score += 25;
  } else {
    score += 10;
  }

  if (repository.stars >= 10) {
    score += 30;
  } else if (repository.stars > 0) {
    score += 20;
  } else {
    score += 10;
  }

  if (repository.forks >= 5) {
    score += 30;
  } else if (repository.forks > 0) {
    score += 20;
  } else {
    score += 10;
  }

  return Math.min(score, 100);
};

const calculateOpenSourceScore = (filesMetadata) => {
  let score = 0;

  if (filesMetadata.hasLicense) {
    score += 50;
  }

  if (filesMetadata.hasContributingGuide) {
    score += 50;
  }

  return score;
};

module.exports = {
  calculateActivityScore,
  calculateDocumentationScore,
  calculateMaintenanceScore,
  calculateOpenSourceScore,
};
