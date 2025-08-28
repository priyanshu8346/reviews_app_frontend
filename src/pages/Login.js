import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useNotification } from "../context-api/NotificationContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await api.post("/auth/send-otp", { email });
      if (data.success) setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await api.post("/auth/verify-otp", { email, otp });
      if (data.success) {
        localStorage.setItem("token", data.token);
        navigate("/review");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
        <h2 className="text-3xl font-bold text-center text-indigo-800">
          Welcome to Review<span className="text-indigo-500">AI</span>
        </h2>
        <p className="text-center text-sm text-gray-600 mt-1">
          Your feedback shapes the future.
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mt-4 text-sm">
            {error}
          </div>
        )}

        {step === 1 && (
          <>
            <label className="block mt-6 mb-2 text-sm font-medium text-gray-700">
              Enter your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={sendOtp}
              disabled={loading || !email}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg shadow transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block mt-6 mb-2 text-sm font-medium text-gray-700">
              Enter OTP sent to {email}
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={verifyOtp}
              disabled={loading || !otp}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg shadow transition disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              onClick={() => setStep(1)}
              className="w-full mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              Change Email
            </button>
          </>
        )}
      </div>
    </div>
  );
}
