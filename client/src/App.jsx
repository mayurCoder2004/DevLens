import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RepositoryWorkspace from "./pages/RepositoryWorkspace";
import ArchitecturePage from "./pages/ArchitecturePage";
import TechnicalDebt from "./pages/TechnicalDebt";
import Deployment from "./pages/Deployment";
import EngineeringHealthPage from "./pages/EngineeringHealthPage";
import AIReview from "./pages/AIReview";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import Repositories from "./pages/Repositories";

import RepositoryLayout from "./layouts/RepositoryLayout";

import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import PullRequestsPage from "./pages/PullRequestsPage";
import PullRequestAnalysisPage from "./pages/PullRequestAnalysisPage";

function App() {
  return (
    <Routes>
      {/* ===================== */}
      {/* Public Routes */}
      {/* ===================== */}

      <Route path="/" element={<LandingPage />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />

      {/* ===================== */}
      {/* Protected Routes */}
      {/* ===================== */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/repositories"
        element={
          <ProtectedRoute>
            <Repositories />
          </ProtectedRoute>
        }
      />

      {/* ===================== */}
      {/* Repository Workspace */}
      {/* ===================== */}

      <Route
        path="/repository/:repositoryId"
        element={
          <ProtectedRoute>
            <RepositoryLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="overview" replace />} />

        <Route path="overview" element={<RepositoryWorkspace />} />

        <Route path="architecture" element={<ArchitecturePage />} />

        <Route path="technical-debt" element={<TechnicalDebt />} />

        <Route path="deployment" element={<Deployment />} />

        <Route path="engineering-health" element={<EngineeringHealthPage />} />

        <Route path="pull-requests" element={<PullRequestsPage />} />

        <Route
          path="pull-requests/:prNumber"
          element={<PullRequestAnalysisPage />}
        />

        <Route path="ai-review" element={<AIReview />} />
      </Route>
    </Routes>
  );
}

export default App;
