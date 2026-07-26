const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const authRoutes = require("./routes/auth.routes");
const repositoryRoutes = require("./routes/repository.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const techStackRoutes = require("./routes/techStack.routes");
const profileRoutes = require("./routes/profile.routes");
const healthRoutes = require("./routes/health.routes");
const portfolioRoutes = require("./routes/portfolio.routes");
const activityRoutes = require("./routes/activity.routes");
const architectureRoutes = require("./routes/architecture.routes");
const technicalDebtRoutes = require("./routes/technicalDebt.routes");
const deploymentRoutes = require("./routes/deployment.routes");
const analysisRoutes = require("./routes/analysis.routes");
const jobStatusRoutes = require("./routes/jobStatus.routes");
const pullRequestRoutes = require("./routes/pullRequest.routes");
const engineeringHealthRoutes = require("./routes/engineeringHealth.routes");
const aiReviewRoutes = require("./routes/aiReview.routes");

const app = express();
const REQUEST_SIZE_LIMIT = "10mb";

// Hide Express technology
app.disable("x-powered-by");

// Security headers
app.use(helmet());

// Compress responses
app.use(compression());

// Configure CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Parse JSON requests
app.use(
  express.json({
    limit: REQUEST_SIZE_LIMIT,
  })
);

// Parse form data
app.use(
  express.urlencoded({
    extended: true,
    limit: REQUEST_SIZE_LIMIT,
  })
);

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

app.use("/api/deployment", deploymentRoutes);

app.use("/api/technical-debt", technicalDebtRoutes);

app.use("/api/analysis", analysisRoutes);

app.use("/api/jobs", jobStatusRoutes);

app.use("/api/pull-requests", pullRequestRoutes);

app.use("/api/engineering-health", engineeringHealthRoutes);

app.use("/api", aiReviewRoutes);

module.exports = app;
