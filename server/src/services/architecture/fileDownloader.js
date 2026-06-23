const axios = require("axios");

class FileDownloader {
  async downloadFileContent(downloadUrl) {
    const response = await axios.get(downloadUrl);

    return response.data;
  }
}

module.exports = new FileDownloader();
