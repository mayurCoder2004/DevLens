const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const repositoryRoutes = require("./routes/repository.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const techStackRoutes = require("./routes/techStack.routes");
const profileRoutes = require("./routes/profile.routes");
const healthRoutes = require("./routes/health.routes");
const portfolioRoutes = require("./routes/portfolio.routes");
const activityRoutes = require("./routes/activity.routes");
const architectureRoutes = require("./routes/architecture.routes");
const technicalDebtRoutes = require(
  "./routes/technicalDebt.routes"
);

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

app.use("/api/analytics", analyticsRoutes);

app.use("/api/tech-stack", techStackRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/health", healthRoutes);

app.use("/api/portfolio", portfolioRoutes);

app.use("/api/activity", activityRoutes);

app.use("/api/architecture", architectureRoutes);

app.use(
  "/api/technical-debt",
  technicalDebtRoutes
);

module.exports = app;
