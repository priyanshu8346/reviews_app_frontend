
// Main app entry point. Handles routing and layout.
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import ReviewForm from './pages/ReviewForm';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Error from './pages/Error404';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';


function App() {
  // Log app mount for traceability
  console.log('[App] App component mounted');

  return (
    <Router>
      {/* Navbar is always visible */}
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/adminLogin' element={<AdminLogin />} />

        {/* Protected user route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/review" element={<ReviewForm />} />
        </Route>

        {/* Admin dashboard (could be protected in future) */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Catch-all for 404s */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}


// Export main App component
export default App;
