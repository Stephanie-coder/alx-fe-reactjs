import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = false; // change to true to simulate login
  return isAuthenticated ? children : <Navigate to="/" replace />;
}
