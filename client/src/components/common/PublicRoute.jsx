import { Navigate } from "react-router-dom";

import { isTokenExpired } from "../../utils/jwt";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token && !isTokenExpired(token)) {
    return <Navigate to="/dashboard" replace />;
  }

  if (token) {
    localStorage.removeItem("token");
  }

  return children;
};

export default PublicRoute;