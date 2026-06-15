const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const repositoryRoutes = require("./routes/repository.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DevLens API Running",
  });
});

app.use("/api/repositories", repositoryRoutes);

app.use("/api/auth", authRoutes);

module.exports = app;
