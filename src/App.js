import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReviewForm from './pages/ReviewForm';
import AdminDashboard from './pages/AdminDashboard';
import api from './services/api';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Fetch user info using /auth/me endpoint
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/auth/me');
        if (data.success) setRole(data.user.role);
      } catch {
        setRole('guest');
      }
    };
    fetchUser();
  }, []);

  if (!role) return <div>Loading...</div>;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/admin" element={
          role === 'admin' ? <AdminDashboard /> : <Navigate to="/review" />
        } />
      </Routes>
    </Router>
  );
}

export default App;
