const axios = require("axios");

class AnalyticsService {
  async getRepositoryAnalytics(repo, githubToken) {
    const owner = repo.owner;
    const name = repo.name;

    const headers = {
      Authorization: `Bearer ${githubToken}`,
    };

    const repoResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${name}`,
      { headers },
    );

    const repoData = repoResponse.data;

    const languageResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${name}/languages`,
      { headers },
    );

    const languages = languageResponse.data;

    const contributorsResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${name}/contributors`,
      { headers },
    );

    const contributors = contributorsResponse.data.length;

    const commitResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${name}/commits`,
      {
        headers,
        params: {
          per_page: 1,
        },
      },
    );

    const lastCommitDate = commitResponse.data[0]?.commit?.author?.date;

    return {
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      watchers: repoData.watchers_count,
      openIssues: repoData.open_issues_count,
      primaryLanguage: repoData.language,
      languages,
      contributors,
      lastCommitDate,
    };
  }
}

module.exports = new AnalyticsService();
