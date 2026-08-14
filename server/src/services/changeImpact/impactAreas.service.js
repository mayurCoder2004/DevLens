const {
  IMPACT_AREA_RULES,
} = require("../../config/changeImpactAreas");

const normalizePath = (filePath) => {
  if (!filePath || typeof filePath !== "string") {
    return "";
  }

  return filePath
    .replace(/\\/g, "/")
    .replace(/^\.\/+/, "")
    .trim();
};

const detectFileAreas = (filePath) => {
  const normalizedPath = normalizePath(filePath);

  if (!normalizedPath) {
    return [];
  }

  return IMPACT_AREA_RULES
    .filter((rule) =>
      rule.patterns.some((pattern) => pattern.test(normalizedPath)),
    )
    .map((rule) => rule.name);
};

const detectAffectedAreas = (files = []) => {
  const areaMap = new Map();

  for (const item of files) {
    const file =
      typeof item === "string"
        ? item
        : item?.file;

    const depth =
      typeof item === "object" && item !== null
        ? item.depth ?? 0
        : 0;

    const areas = detectFileAreas(file);

    for (const area of areas) {
      if (!areaMap.has(area)) {
        areaMap.set(area, {
          name: area,
          files: [],
          fileCount: 0,
          maxDepth: 0,
        });
      }

      const areaData = areaMap.get(area);

      if (!areaData.files.includes(file)) {
        areaData.files.push(file);
        areaData.fileCount += 1;
      }

      areaData.maxDepth = Math.max(
        areaData.maxDepth,
        depth,
      );
    }
  }

  return [...areaMap.values()].sort((a, b) => {
    if (b.fileCount !== a.fileCount) {
      return b.fileCount - a.fileCount;
    }

    return b.maxDepth - a.maxDepth;
  });
};

module.exports = {
  normalizePath,
  detectFileAreas,
  detectAffectedAreas,
};