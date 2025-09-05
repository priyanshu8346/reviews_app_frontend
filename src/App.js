import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReviewForm from './pages/ReviewForm';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Error from './pages/Error404';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';

function App() {

  return (
    <Router >
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/review" element={<ReviewForm />} />
      </Route>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
