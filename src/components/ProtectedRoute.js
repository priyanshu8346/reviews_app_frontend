import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // store this on login

  if (!token) return <Navigate to="/" replace />;
  if (adminOnly && role !== 'admin') return <Navigate to="/" replace />;

  return children;
}
