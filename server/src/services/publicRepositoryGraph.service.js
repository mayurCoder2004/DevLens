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

    const parts = url.pathname
      .split("/")
      .filter(Boolean);

    if (parts.length < 2) {
      throw new Error("Invalid GitHub repository URL.");
    }

    return {
      owner: parts[0],
      repo: parts[1].replace(/\.git$/, ""),
    };
  } catch (error) {
    if (error.message.includes("GitHub repository URL")) {
      throw error;
    }

    throw new Error("Invalid GitHub repository URL.");
  }
};

const getPublicRepository = async (repositoryUrl) => {
  const { owner, repo } =
    parseGitHubRepositoryUrl(repositoryUrl);

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
    owner,
    name: repo,
    fullName: response.data.full_name,
    defaultBranch: response.data.default_branch,
    description: response.data.description,
    language: response.data.language,
    stars: response.data.stargazers_count,
    forks: response.data.forks_count,
    isPrivate: response.data.private,
    htmlUrl: response.data.html_url,
  };
};

const getPublicRepositoryTree = async (
  owner,
  repo,
  defaultBranch,
) => {
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${encodeURIComponent(defaultBranch)}`,
    {
      params: {
        recursive: "1",
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
};

const isSourceFile = (filePath) => {
  const normalizedPath = filePath.toLowerCase();

  if (
    !SOURCE_EXTENSIONS.some((extension) =>
      normalizedPath.endsWith(extension),
    )
  ) {
    return false;
  }

  return !IGNORED_DIRECTORIES.some((directory) =>
    normalizedPath.includes(directory),
  );
};

const getSourceFiles = (files = []) => {
  return files
    .filter(
      (file) =>
        file &&
        file.type === "blob" &&
        typeof file.path === "string" &&
        isSourceFile(file.path),
    )
    .slice(0, MAX_SOURCE_FILES);
};

const getPublicFileContent = async (
  owner,
  repo,
  defaultBranch,
  filePath,
) => {
  const rawUrl =
    `https://raw.githubusercontent.com/` +
    `${owner}/${repo}/${encodeURIComponent(defaultBranch)}/` +
    filePath
      .split("/")
      .map(encodeURIComponent)
      .join("/");

  try {
    const response = await axios.get(rawUrl, {
      responseType: "text",
      timeout: 10000,
      maxContentLength: MAX_SOURCE_FILE_SIZE,
      maxBodyLength: MAX_SOURCE_FILE_SIZE,
      validateStatus: (status) =>
        status >= 200 && status < 300,
    });

    if (typeof response.data !== "string") {
      return null;
    }

    if (
      Buffer.byteLength(response.data, "utf8") >
      MAX_SOURCE_FILE_SIZE
    ) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error(
      `GitHub raw file error for ${filePath}:`,
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

  const results = [];

  for (const file of sourceFiles) {
    const content = await getPublicFileContent(
      owner,
      repo,
      defaultBranch,
      file.path,
    );

    if (content === null) {
      continue;
    }

    results.push({
      name: file.path.split("/").pop(),
      path: file.path,
      content,
    });
  }

  return results;
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
