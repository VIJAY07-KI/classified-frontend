import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, deleteReview } from "./ReviewSlice";
import { useEffect } from "react";

export default function Review() {
  const dispatch = useDispatch();
  const { reviewData, loading, serverErr } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-6 text-gray-600">Loading...</p>;
  if (serverErr) return <p className="text-center text-red-500">Error: {serverErr.message || serverErr}</p>;

  return (
    <div className="bg-sky-100 min-h-screen p-6">
      <div className="max-w-full overflow-x-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Total Reviews - {reviewData.length}
          </h2>
        </div>

        {reviewData.length > 0 ? (
          <table className="min-w-[1000px] w-full text-sm text-left border border-gray-200 rounded overflow-x-auto">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Event</th>
                <th className="px-4 py-2 border">Rating</th>
                <th className="px-4 py-2 border">Comment</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviewData.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{review.user?.name || "N/A"}</td>
                  <td className="px-4 py-2 border">{review.event?.title || "N/A"}</td>
                  <td className="px-4 py-2 border">{review.rating} ★</td>
                  <td className="px-4 py-2 border">{review.comment}</td>
                  <td className="px-4 py-2 border">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    <button
                      onClick={() => {
                        const confirmDelete = window.confirm("Delete this review?");
                        if (confirmDelete) {
                          dispatch(deleteReview(review._id));
                        }
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 mt-4">No reviews found.</p>
        )}
      </div>
    </div>
  );
}
