import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ isAuthenticated, children }) {
  // If user is not authenticated, redirect to login
  return isAuthenticated ? children : <Navigate to="/login" replace />
}
