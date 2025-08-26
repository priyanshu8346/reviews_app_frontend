import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function OtpVerify() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('pendingEmail');

  const verifyOtp = async () => {
    try {
      const { data } = await api.post('/auth/verify-otp', { email, otp });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role); // add role in your backend JWT response
      localStorage.removeItem('pendingEmail');
      navigate(data.role === 'admin' ? '/admin' : '/review');
    } catch (err) {
      alert(err.response?.data?.error || 'OTP verification failed');
    }
  };

  return (
    <div>
      <h2>Enter OTP sent to {email}</h2>
      <input
        type="text"
        placeholder="6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify</button>
    </div>
  );
}
