import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10 border border-slate-200 text-center">
        <h1 className="text-7xl font-extrabold text-indigo-600">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          Oops! Page not found
        </h2>
        <p className="mt-2 text-gray-600 text-sm">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg shadow transition"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg shadow transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
