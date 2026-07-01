const axios = require("axios");

const makeGitHubRequest = async ({
  method = "GET",
  url,
  githubToken,
  data = null,
  params = {},
}) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      params,
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "GitHub API Error:",
      error.response?.data || error.message
    );

    throw new Error("GitHub API request failed.");
  }
};

const getRepositories = async (githubToken) => {
  console.log("TOKEN USED:", githubToken);

  return makeGitHubRequest({
    url: "https://api.github.com/user/repos",
    githubToken,
    params: {
      per_page: 100,
    },
  });
};

const getRepositoryContents = async (
  owner,
  repo,
  githubToken
) => {
  return makeGitHubRequest({
    url: `https://api.github.com/repos/${owner}/${repo}/contents`,
    githubToken,
  });
};

const getPullRequests = async (
  owner,
  repo,
  githubToken
) => {
  return makeGitHubRequest({
    url: `https://api.github.com/repos/${owner}/${repo}/pulls`,
    githubToken,
  });
};

const getPullRequestFiles = async (
  owner,
  repo,
  prNumber,
  githubToken
) => {
  return makeGitHubRequest({
    url: `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`,
    githubToken,
  });
};

module.exports = {
  getRepositories,
  getRepositoryContents,
  getPullRequests,
  getPullRequestFiles,
};