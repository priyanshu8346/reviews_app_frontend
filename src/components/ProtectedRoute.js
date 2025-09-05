
// Protects routes that require authentication
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  // Log protected route access attempt
  if (!token) {
    console.warn('[ProtectedRoute] No token found, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  console.log('[ProtectedRoute] Authenticated, rendering protected route');
  return <Outlet />;
}
