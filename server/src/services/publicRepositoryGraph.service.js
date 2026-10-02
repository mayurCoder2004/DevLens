const axios = require("axios");

const MAX_SOURCE_FILES = 250;
const MAX_SOURCE_FILE_SIZE = 250 * 1024;

const SOURCE_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];

const IGNORED_DIRECTORIES = [
  "node_modules/",
  ".git/",
  "dist/",
  "build/",
  "coverage/",
  "vendor/",
  ".next/",
  ".turbo/",
  "out/",
];

const parseGitHubRepositoryUrl = (repositoryUrl) => {
  try {
    const url = new URL(repositoryUrl);

    if (url.hostname !== "github.com") {
      throw new Error("Only GitHub repository URLs are supported.");
    }

    const segments = url.pathname
      .split("/")
      .filter(Boolean);

    if (segments.length < 2) {
      throw new Error("Invalid GitHub repository URL.");
    }

    const owner = segments[0];
    const repo = segments[1].replace(/\.git$/, "");

    return {
      owner,
      repo,
    };
  } catch (error) {
    if (error.message === "Only GitHub repository URLs are supported." ||
        error.message === "Invalid GitHub repository URL.") {
      throw error;
    }

    throw new Error("Invalid GitHub repository URL.");
  }
};

const getPublicRepository = async (repositoryUrl) => {
  const { owner, repo } = parseGitHubRepositoryUrl(repositoryUrl);

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        timeout: 10000,
      },
    );

    return {
      owner: response.data.owner.login,
      name: response.data.name,
      fullName: response.data.full_name,
      description: response.data.description,
      defaultBranch: response.data.default_branch,
      language: response.data.language,
      stars: response.data.stargazers_count,
      forks: response.data.forks_count,
      url: response.data.html_url,
    };
  } catch (error) {
    console.error(
      "GitHub repository metadata error:",
      error.response?.data || error.message,
    );

    if (error.response?.status === 404) {
      throw new Error("Repository not found.");
    }

    if (error.response?.status === 403) {
      throw new Error("GitHub API rate limit exceeded.");
    }

    throw new Error("Failed to fetch public repository.");
  }
};

const getPublicRepositoryTree = async (
  owner,
  repo,
  defaultBranch,
) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${encodeURIComponent(defaultBranch)}`,
      {
        params: {
          recursive: true,
        },
        headers: {
          Accept: "application/vnd.github+json",
        },
        timeout: 15000,
      },
    );

    if (response.data.truncated) {
      throw new Error(
        "Repository tree is too large to analyze safely.",
      );
    }

    return response.data.tree || [];
  } catch (error) {
    console.error(
      "GitHub repository tree error:",
      error.response?.data || error.message,
    );

    if (error.message === "Repository tree is too large to analyze safely.") {
      throw error;
    }

    if (error.response?.status === 404) {
      throw new Error("Repository tree not found.");
    }

    if (error.response?.status === 403) {
      throw new Error("GitHub API rate limit exceeded.");
    }

    throw new Error("Failed to fetch repository tree.");
  }
};

const isSourceFile = (filePath) => {
  if (typeof filePath !== "string") {
    return false;
  }

  const normalizedPath = filePath.toLowerCase();

  const isIgnored = IGNORED_DIRECTORIES.some((directory) =>
    normalizedPath.includes(directory),
  );

  if (isIgnored) {
    return false;
  }

  return SOURCE_EXTENSIONS.some((extension) =>
    normalizedPath.endsWith(extension),
  );
};

const getSourceFiles = (files = []) => {
  const sourceFiles = files.filter((file) => {
    if (!file || typeof file.path !== "string") {
      return false;
    }

    if (file.type !== "blob") {
      return false;
    }

    return isSourceFile(file.path);
  });

  return sourceFiles
    .filter((file) => {
      return (
        typeof file.size !== "number" ||
        file.size <= MAX_SOURCE_FILE_SIZE
      );
    })
    .slice(0, MAX_SOURCE_FILES);
};

const getPublicFileContent = async (
  owner,
  repo,
  path,
  defaultBranch,
) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path
        .split("/")
        .map(encodeURIComponent)
        .join("/")}`,
      {
        params: {
          ref: defaultBranch,
        },
        headers: {
          Accept: "application/vnd.github.raw+json",
        },
        timeout: 10000,
        maxContentLength: MAX_SOURCE_FILE_SIZE,
        maxBodyLength: MAX_SOURCE_FILE_SIZE,
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      `GitHub file content error for ${path}:`,
      error.response?.data || error.message,
    );

    return null;
  }
};

const getPublicSourceFiles = async (
  owner,
  repo,
  defaultBranch,
  files,
) => {
  const sourceFiles = getSourceFiles(files);
  const sourceContents = [];

  for (const file of sourceFiles) {
    const content = await getPublicFileContent(
      owner,
      repo,
      file.path,
      defaultBranch,
    );

    if (typeof content === "string") {
      sourceContents.push({
        path: file.path,
        size: file.size,
        content,
      });
    }
  }

  return sourceContents;
};

module.exports = {
  parseGitHubRepositoryUrl,
  getPublicRepository,
  getPublicRepositoryTree,
  isSourceFile,
  getSourceFiles,
  getPublicFileContent,
  getPublicSourceFiles,
};
