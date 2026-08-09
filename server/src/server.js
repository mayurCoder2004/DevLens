require("dotenv").config();

const env = require("./config/env");
const logger = require("./config/logger");
const app = require("./app");

app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});
