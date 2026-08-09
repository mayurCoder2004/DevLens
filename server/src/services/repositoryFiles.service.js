const { getRepositoryContents } = require("./github.service");

const getRepositoryFilesMetadata = async (owner, repo, githubToken) => {
  try {
    const files = await getRepositoryContents(owner, repo, githubToken);

    const hasReadme = files.some(
      (file) => file.name.toLowerCase() === "readme.md",
    );

    const hasLicense = files.some(
      (file) => file.name.toLowerCase() === "license",
    );

    const hasContributingGuide = files.some(
      (file) => file.name.toLowerCase() === "contributing.md",
    );

    return {
      hasReadme,
      hasLicense,
      hasContributingGuide,
      totalRootFiles: files.length,
    };
  } catch (error) {
    console.error("Failed to get repository file metadata:", error.message);

    return {
      hasReadme: false,
      hasLicense: false,
      hasContributingGuide: false,
      totalRootFiles: 0,
    };
  }
};

module.exports = {
  getRepositoryFilesMetadata,
};
