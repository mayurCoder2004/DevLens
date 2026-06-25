const axios = require("axios");

class RepositoryScanner {
  async fetchWithRetry(url, headers, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await axios.get(url, {
          headers,
          timeout: 15000,
        });
      } catch (error) {
        const shouldRetry =
          error.code === "ECONNRESET" ||
          error.code === "ETIMEDOUT" ||
          error.code === "ECONNABORTED";

        if (!shouldRetry || attempt === retries) {
          throw error;
        }

        console.log(
          `Retrying request (${attempt}/${retries}) -> ${url}`
        );

        await new Promise((resolve) =>
          setTimeout(resolve, 1000)
        );
      }
    }
  }

  async getAllRepositoryFiles(owner, repo, githubToken) {
    const headers = {
      Authorization: `Bearer ${githubToken}`,
    };

    const files = [];

    await this.scanDirectory(
      `https://api.github.com/repos/${owner}/${repo}/contents`,
      headers,
      files
    );

    return files;
  }

  async scanDirectory(url, headers, files) {
    const response = await this.fetchWithRetry(
      url,
      headers
    );

    const contents = response.data;

    for (const item of contents) {
      if (item.type === "file") {
        const validExtensions = [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ];

        const isCodeFile =
          validExtensions.some((ext) =>
            item.name.endsWith(ext)
          );

        if (isCodeFile) {
          files.push({
            name: item.name,
            path: item.path,
            downloadUrl: item.download_url,
          });
        }
      }

      if (item.type === "dir") {
        await this.scanDirectory(
          item.url,
          headers,
          files
        );
      }
    }
  }

  async getRepositoryContents(
    owner,
    repo,
    githubToken
  ) {
    const headers = {
      Authorization: `Bearer ${githubToken}`,
    };

    const contents = [];

    await this.scanAllContents(
      `https://api.github.com/repos/${owner}/${repo}/contents`,
      headers,
      contents
    );

    return contents;
  }

  async scanAllContents(
    url,
    headers,
    contents
  ) {
    const response = await this.fetchWithRetry(
      url,
      headers
    );

    const items = response.data;

    for (const item of items) {
      if (item.type === "file") {
        contents.push({
          name: item.name,
          path: item.path,
          downloadUrl: item.download_url,
        });
      }

      if (item.type === "dir") {
        await this.scanAllContents(
          item.url,
          headers,
          contents
        );
      }
    }
  }
}

module.exports = new RepositoryScanner();