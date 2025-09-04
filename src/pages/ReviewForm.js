import { useEffect, useState } from "react";
import { Star, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [latestReview, setLatestReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  // Fetch latest review on mount
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const { data } = await api.get("/reviews/my-latest");
        if (data.success && data.review) {
          setLatestReview(data.review);
          setRating(data.review.rating);
          setText(data.review.text);
        }
      } catch {
        alert("No previous review found");
      }
    };
    fetchLatest();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Submit or edit review
  const submitReview = async () => {
    setLoading(true);
    try {
      if (editing && latestReview) {
        const { data } = await api.put(`/reviews/${latestReview._id}`, {
          rating,
          text,
        });
        if (data.success) {
          alert("Review updated!");
          setLatestReview(data.review);
          setEditing(false);
        }
      } else {
        const { data } = await api.post("/reviews/createReview", { rating, text });
        if (data.success) {
          alert("Review submitted!");
          setLatestReview(data.review);
        }
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error submitting review");
    } finally {
      setLoading(false);
    }
  };

  // Delete review
  const deleteReview = async () => {
    if (!latestReview) return;
    if (!window.confirm("Are you sure you want to delete your review?")) return;
    setLoading(true);
    try {
      const { data } = await api.delete(`/reviews/${latestReview._id}`);
      if (data.success) {
        alert("Review deleted!");
        setLatestReview(null);
        setRating(5);
        setText("");
        setEditing(false);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 relative">
        
        {/* Logout button top-right */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm shadow transition"
        >
          <LogOut size={16} />
          Logout
        </button>

        <h2 className="text-3xl font-bold text-center text-indigo-800">
          {editing ? "Edit Your Review" : "Submit a Review"}
        </h2>
        <p className="text-center text-sm text-gray-600 mt-1">
          Your voice matters. Share your experience with Review
          <span className="text-indigo-500">AI</span>.
        </p>

        {/* Star Rating */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className={`cursor-pointer transition ${
                  (hoverRating || rating) >= star
                    ? "fill-indigo-500 text-indigo-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your feedback..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          onClick={submitReview}
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg shadow transition disabled:opacity-50"
        >
          {editing ? "Update Review" : "Submit Review"}
        </button>

        {/* Show Latest Review */}
        {latestReview && !editing && (
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
              Your Latest Review
            </h3>

            {/* Stars */}
            <div className="flex gap-1 justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={22}
                  className={`${
                    latestReview.rating >= star
                      ? "fill-indigo-500 text-indigo-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <p className="text-gray-600 text-center">{latestReview.text}</p>

            <div className="mt-4 flex gap-3 justify-center">
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition"
              >
                Edit
              </button>
              <button
                onClick={deleteReview}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
