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
    console.error("GitHub API Error:", error.response?.data || error.message);

    throw new Error("GitHub API request failed.");
  }
};

const getRepositories = async (githubToken) => {
  let page = 1;
  let repositories = [];

  while (true) {
    const repos = await makeGitHubRequest({
      url: "https://api.github.com/user/repos",
      githubToken,
      params: {
        per_page: 100,
        page,
      },
    });

    repositories.push(...repos);

    if (repos.length < 100) {
      break;
    }

    page++;
  }

  return repositories;
};

const getRepositoryContents = async (owner, repo, githubToken) => {
  return makeGitHubRequest({
    url: `https://api.github.com/repos/${owner}/${repo}/contents`,
    githubToken,
  });
};

const getPullRequests = async (owner, repo, githubToken) => {
  return makeGitHubRequest({
    url: `https://api.github.com/repos/${owner}/${repo}/pulls`,
    githubToken,
  });
};

const getPullRequestFiles = async (owner, repo, prNumber, githubToken) => {
  return makeGitHubRequest({
    url: `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`,
    githubToken,
  });
};

const getPullRequest = async (owner, repo, prNumber, accessToken) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching pull request:",
      error.response?.data || error.message,
    );

    throw new Error("Failed to fetch pull request.");
  }
};

const getRepositoryPullRequests = async (owner, repo, githubToken) => {
  return makeGitHubRequest({
    url: `https://api.github.com/repos/${owner}/${repo}/pulls`,
    githubToken,
    params: {
      state: "all",
      sort: "updated",
      direction: "desc",
      per_page: 100,
    },
  });
};

module.exports = {
  getRepositories,
  getRepositoryContents,
  getPullRequests,
  getPullRequestFiles,
  getPullRequest,
  getRepositoryPullRequests,
};
