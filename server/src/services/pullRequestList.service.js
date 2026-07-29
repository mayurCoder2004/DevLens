const githubService = require("./github.service");

const listRepositoryPullRequests = async ({
  owner,
  repo,
  githubToken,
}) => {
  const pullRequests =
    await githubService.getRepositoryPullRequests(
      owner,
      repo,
      githubToken
    );

  return pullRequests.map((pr) => ({
    number: pr.number,
    title: pr.title,
    state: pr.state,
    draft: pr.draft,
    author: pr.user.login,
    authorAvatar: pr.user.avatar_url,
    createdAt: pr.created_at,
    updatedAt: pr.updated_at,
    url: pr.html_url,
  }));
};

module.exports = {
  listRepositoryPullRequests,
};