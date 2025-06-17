import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ReviewForm() {
  const { id: eventId } = useParams(); // event ID from route
  const [event, setEvent] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:3777/event/${eventId}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setEvent(res.data);
      } catch (err) {
        setError("Failed to load event details.");
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    try {
      await axios.post(
        `http://localhost:3777/reviews`,
        {
          event: eventId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setSuccessMsg("Review submitted successfully!");
      setRating(5);
      setComment("");
    } catch (err) {
      setError("Failed to submit review.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Leave a Review for: {event?.title || "Loading..."}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-600 mb-1">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-600 mb-1">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="w-full border rounded px-3 py-2"
            placeholder="Write your feedback..."
          ></textarea>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
