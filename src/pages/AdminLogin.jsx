import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, KeyRound } from "lucide-react";
import api from "../services/api"; 

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1: Request OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        console.log("Requesting OTP for email:", email);
      const { data } = await api.post("/admin/send-otp", { email });
      if (data.success) {
        setOtpSent(true);
        alert("OTP sent to your email!");
      } else {
        alert(data.error || "Failed to send OTP");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/admin/verify-otp", { email, otp });
      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/admin");
      } else {
        alert(data.error || "Invalid OTP");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 flex items-center justify-center px-4">
      <div className="bg-indigo-900 rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
        <div className="flex justify-center mb-4">
          {!otpSent ? (
            <Mail className="w-12 h-12 text-indigo-300" />
          ) : (
            <KeyRound className="w-12 h-12 text-indigo-300" />
          )}
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">
          {otpSent ? "Verify OTP" : "Admin Login"}
        </h2>
        <p className="text-gray-400 mb-6">
          {otpSent
            ? "Enter the OTP sent to your email"
            : "Enter your admin email to receive OTP"}
        </p>

        <form
          onSubmit={otpSent ? verifyOtp : sendOtp}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-indigo-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
            disabled={otpSent}
          />
          {otpSent && (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-indigo-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition shadow-lg disabled:opacity-50"
          >
            {loading
              ? otpSent
                ? "Verifying..."
                : "Sending..."
              : otpSent
              ? "Verify OTP"
              : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
