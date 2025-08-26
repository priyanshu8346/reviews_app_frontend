import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import api from "../services/api";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/me");
        if (data.success) setUser(data.user);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-950 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left: Logo */}
          <Link 
            to="/" 
            className="flex items-center text-white font-bold text-xl tracking-wide hover:text-indigo-300 transition"
          >
            <Shield className="w-6 h-6 mr-2 text-indigo-300" />
            Review<span className="text-indigo-300 ml-1">AI</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/review" 
              className="text-white hover:text-indigo-300 font-medium transition"
            >
              Give Review
            </Link>
            {user?.role === "admin" && (
              <Link 
                to="/admin" 
                className="text-white hover:text-indigo-300 font-medium transition"
              >
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* Right: User / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white text-sm">
                  {user.email}
                </span>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg shadow transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg shadow transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-indigo-900 px-4 pb-4">
          <Link 
            to="/review" 
            onClick={() => setIsOpen(false)}
            className="block py-2 text-white hover:text-indigo-300 font-medium"
          >
            Give Review
          </Link>
          {user?.role === "admin" && (
            <Link 
              to="/admin" 
              onClick={() => setIsOpen(false)}
              className="block py-2 text-white hover:text-indigo-300 font-medium"
            >
              Admin Dashboard
            </Link>
          )}
          <div className="mt-2 border-t border-indigo-700 pt-2">
            {user ? (
              <button 
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full text-left py-2 px-3 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg shadow transition"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="block py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg shadow transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
