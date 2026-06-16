const axios = require("axios");

class AnalyticsService {

  async getRepositoryAnalytics(repo, githubToken) {

    const owner = repo.owner;
    const name = repo.name;

    const headers = {
      Authorization: `Bearer ${githubToken}`
    };

    const repoResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${name}`,
      { headers }
    );

    const repoData = repoResponse.data;

    return {
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      watchers: repoData.watchers_count,
      openIssues: repoData.open_issues_count,
      primaryLanguage: repoData.language
    };
  }
}

module.exports = new AnalyticsService();