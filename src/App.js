import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './context-api/NotificationContext';
import ReviewForm from './pages/ReviewForm';
import AdminDashboard from './pages/AdminDashboard';
import api from './services/api';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Error from './pages/Error404';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';

function App() {

  return (
    <Router>
      <Navbar />
      <NotificationProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path="/review" element={ 
        <ProtectedRoute>
            <ReviewForm /> 
        </ProtectedRoute>}/>
        <Route path="/admin" element={<AdminDashboard /> 
        } />
        <Route path="*" element={<Error />} />
      </Routes>
      </NotificationProvider>
    </Router>
  );
}

export default App;
