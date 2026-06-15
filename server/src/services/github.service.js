const axios = require("axios");

const getRepositories = async (
  githubToken
) => {

  console.log(
    "TOKEN USED:",
    githubToken
  );

  const response =
    await axios.get(
      "https://api.github.com/user/repos?per_page=100",
      {
        headers: {
          Authorization:
            `Bearer ${githubToken}`,
        },
      }
    );

  return response.data;
};

module.exports = {
  getRepositories,
};