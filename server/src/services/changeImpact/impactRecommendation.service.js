const {
  IMPACT_RECOMMENDATION_RULES,
} = require("../../config/changeImpactRecommendations");

const getPriority = ({
  fileCount = 0,
  maxDepth = 0,
}) => {
  const impact = fileCount + maxDepth;

  if (fileCount >= 5 || maxDepth >= 4 || impact >= 7) {
    return "Critical";
  }

  if (fileCount >= 3 || maxDepth >= 2 || impact >= 4) {
    return "High";
  }

  if (fileCount >= 1 || maxDepth >= 1) {
    return "Moderate";
  }

  return "Low";
};

const generateAreaRecommendations = (area) => {
  if (!area || !area.name) {
    return null;
  }

  const rule = IMPACT_RECOMMENDATION_RULES[area.name];

  if (!rule) {
    return {
      area: area.name,
      priority: getPriority(area),
      actions: [],
      reason: "No specific verification rules are available for this area.",
    };
  }

  return {
    area: area.name,
    priority: getPriority(area),
    affectedFileCount: area.fileCount || 0,
    maxDepth: area.maxDepth || 0,
    actions: rule.actions.map((action) => ({
      title: action.title,
      description: action.description,
    })),
    reason: `${area.fileCount || 0} affected file(s) detected with a maximum dependency depth of ${area.maxDepth || 0}.`,
  };
};

const generateImpactRecommendations = (areas = []) => {
  return areas
    .map(generateAreaRecommendations)
    .filter(Boolean)
    .sort((a, b) => {
      const priorityOrder = {
        Critical: 4,
        High: 3,
        Moderate: 2,
        Low: 1,
      };

      return (
        priorityOrder[b.priority] -
        priorityOrder[a.priority]
      );
    });
};

module.exports = {
  getPriority,
  generateAreaRecommendations,
  generateImpactRecommendations,
};