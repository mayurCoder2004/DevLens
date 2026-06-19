const axios = require("axios");

class RepositoryScanner {
  async getAllRepositoryFiles(owner, repo, githubToken) {
    const headers = {
      Authorization: `Bearer ${githubToken}`,
    };

    const files = [];

    await this.scanDirectory(
      `https://api.github.com/repos/${owner}/${repo}/contents`,
      headers,
      files,
    );

    return files;
  }

  async scanDirectory(url, headers, files) {
    const response = await axios.get(url, {
      headers,
    });

    const contents = response.data;

    for (const item of contents) {
      if (item.type === "file") {
        const validExtensions = [".js", ".jsx", ".ts", ".tsx"];

        const isCodeFile = validExtensions.some((ext) =>
          item.name.endsWith(ext),
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
        await this.scanDirectory(item.url, headers, files);
      }
    }
  }
}

module.exports = new RepositoryScanner();
