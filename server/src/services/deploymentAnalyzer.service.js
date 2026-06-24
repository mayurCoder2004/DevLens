function analyzeInfrastructure(contents) {
  const dockerfile = contents.find(
    (file) => file.name === "Dockerfile"
  );

  const dockerCompose = contents.find(
    (file) =>
      file.name === "docker-compose.yml" ||
      file.name === "docker-compose.yaml"
  );

  let score = 0;

  const strengths = [];
  const warnings = [];
  const criticalIssues = [];

  if (dockerfile) {
    score += 60;

    strengths.push(
      "Dockerfile detected"
    );
  } else {
    criticalIssues.push(
      "No Dockerfile found"
    );
  }

  if (dockerCompose) {
    score += 40;

    strengths.push(
      "Docker Compose configuration detected"
    );
  } else {
    warnings.push(
      "Docker Compose configuration missing"
    );
  }

  return {
    score,

    checks: {
      dockerfile: !!dockerfile,
      dockerCompose: !!dockerCompose,
    },

    strengths,
    warnings,
    criticalIssues,
  };
}

module.exports = {
  analyzeInfrastructure,
};