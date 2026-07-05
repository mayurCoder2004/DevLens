import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RepositoryDetails from "./pages/RepositoryDetails";
import ArchitecturePage from "./pages/ArchitecturePage";
import TechnicalDebt from "./pages/TechnicalDebt";
import Deployment from "./pages/Deployment";
import EngineeringHealthPage from "./pages/EngineeringHealthPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

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
            <RepositoryDetails />
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
    </Routes>
  );
}

export default App;
