import { Link } from "react-router-dom";
import { Shield, Star, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-indigo-950 min-h-screen flex flex-col">
      
      {/* Hero Section */}
      <header className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Shield className="w-10 h-10 text-indigo-300" />
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Welcome to <span className="text-indigo-300">ReviewAI</span>
          </h1>
        </div>

        <p className="text-gray-300 max-w-2xl text-lg md:text-xl mb-8">
          The AI-powered platform to collect, analyze, and understand your customer feedback.
          Whether you're a user sharing experiences or an admin managing insights, we make reviews smarter.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Link 
            to="/login" 
            state={{ role: "user" }}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg text-lg font-medium transition"
          >
            Login as User
          </Link>
          <Link 
            to="/adminLogin" 
            state={{ role: "admin" }}
            className="px-6 py-3 bg-indigo-400 hover:bg-indigo-500 text-indigo-950 rounded-xl shadow-lg text-lg font-medium transition"
          >
            Login as Admin
          </Link>
        </div>
      </header>

      {/* Feature Highlights */}
      <section className="bg-indigo-900 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center space-y-3">
            <Star className="w-10 h-10 text-yellow-400" />
            <h3 className="text-white text-lg font-semibold">AI-Powered Analysis</h3>
            <p className="text-gray-400 text-sm">
              Automatically detect problems, good points, and sentiment in every review.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <Users className="w-10 h-10 text-indigo-300" />
            <h3 className="text-white text-lg font-semibold">User-Friendly</h3>
            <p className="text-gray-400 text-sm">
              Simple interface for both users and admins — no training required.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <Shield className="w-10 h-10 text-green-400" />
            <h3 className="text-white text-lg font-semibold">Secure & Private</h3>
            <p className="text-gray-400 text-sm">
              We protect user data and only provide insights you can trust.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-950 py-4 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} ReviewAI. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
