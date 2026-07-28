import { Routes, Route } from "react-router-dom";

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

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
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

      {/* Protected Routes */}
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

      <Route
        path="/repository/:id"
        element={
          <ProtectedRoute>
            <RepositoryWorkspace />
          </ProtectedRoute>
        }
      />

      <Route
        path="/architecture/:repositoryId"
        element={
          <ProtectedRoute>
            <ArchitecturePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/technical-debt/:repositoryId"
        element={
          <ProtectedRoute>
            <TechnicalDebt />
          </ProtectedRoute>
        }
      />

      <Route
        path="/repositories/:id/deployment"
        element={
          <ProtectedRoute>
            <Deployment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/repositories/:id/engineering-health"
        element={
          <ProtectedRoute>
            <EngineeringHealthPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/repositories/:id/ai-review"
        element={
          <ProtectedRoute>
            <AIReview />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;