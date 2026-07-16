import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RepositoryDetails from "./pages/RepositoryDetails";
import ArchitecturePage from "./pages/ArchitecturePage";
import TechnicalDebt from "./pages/TechnicalDebt";
import Deployment from "./pages/Deployment";
import EngineeringHealthPage from "./pages/EngineeringHealthPage";
import AIReview from "./pages/AIReview";
import LandingPage from "./pages/LandingPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import Repositories from "./pages/Repositories";
import RepositoryWorkspace from "./pages/RepositoryWorkspace";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/privacy" element={<PrivacyPage />} />

      <Route path="/terms" element={<TermsPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
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

      <Route path="/technical-debt/:repositoryId" element={<TechnicalDebt />} />

      <Route path="/repositories/:id/deployment" element={<Deployment />} />

      <Route
        path="/repositories/:id/engineering-health"
        element={
          <ProtectedRoute>
            <EngineeringHealthPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/repositories"
        element={<Repositories />}
      />

      <Route path="/repositories/:id/ai-review" element={<AIReview />} />
    </Routes>
  );
}

export default App;
