import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RepositoryDetails from "./pages/RepositoryDetails";

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
    </Routes>
  );
}

export default App;
