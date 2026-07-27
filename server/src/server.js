require("dotenv").config();

const env = require("./config/env");
const app = require("./app");

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});