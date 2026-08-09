const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const {
  apiLimiter,
  authLimiter,
  aiLimiter,
} = require("./middleware/rateLimit.middleware");
const errorHandler = require("./middleware/error.middleware");

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
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

const REQUEST_SIZE_LIMIT = "10mb";

// ============================
// Security Middleware
// ============================

// Hide Express technology
app.disable("x-powered-by");

// Secure HTTP headers
app.use(helmet());

// Compress all responses
app.use(compression());

// Configure CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Parse JSON requests
app.use(
  express.json({
    limit: REQUEST_SIZE_LIMIT,
  }),
);

// Parse URL Encoded requests
app.use(
  express.urlencoded({
    extended: true,
    limit: REQUEST_SIZE_LIMIT,
  }),
);

// ============================
// Health Check
// ============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DevLens API Running",
  });
});

// ============================
// Routes
// ============================

// Authentication
app.use("/api/auth", authLimiter, authRoutes);

// Repository APIs
app.use("/api/repositories", apiLimiter, repositoryRoutes);
app.use("/api/analytics", apiLimiter, analyticsRoutes);
app.use("/api/tech-stack", apiLimiter, techStackRoutes);
app.use("/api/profile", apiLimiter, profileRoutes);
app.use("/api/portfolio", apiLimiter, portfolioRoutes);
app.use("/api/activity", apiLimiter, activityRoutes);
app.use("/api/jobs", apiLimiter, jobStatusRoutes);

// Health Endpoint (No Rate Limit)
app.use("/api/health", healthRoutes);

// AI / Heavy Processing Endpoints
app.use("/api/architecture", aiLimiter, architectureRoutes);
app.use("/api/deployment", aiLimiter, deploymentRoutes);
app.use("/api/technical-debt", aiLimiter, technicalDebtRoutes);
app.use("/api/analysis", aiLimiter, analysisRoutes);
app.use("/api/pull-requests", aiLimiter, pullRequestRoutes);
app.use("/api/engineering-health", aiLimiter, engineeringHealthRoutes);
app.use("/api", aiLimiter, aiReviewRoutes);

// Dashboard routes
app.use("/api/dashboard", apiLimiter, dashboardRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
