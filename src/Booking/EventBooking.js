import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "./EventSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EventBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventData, loading, serverErr } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-6 text-gray-600">Loading...</p>;
  if (serverErr) return <p className="text-center text-red-500">Error: {serverErr.message || serverErr}</p>;

  return (
    <div className="bg-sky-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Total Events - {eventData.length}
        </h2>

        {eventData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventData.map((event) => (
              <div key={event._id} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={event.posterImage || "https://via.placeholder.com/300x180?text=No+Image"}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-1">{event.description?.slice(0, 80)}...</p>
                <p className="text-gray-500 text-sm">📍 {event.location}</p>
                <p className="text-gray-500 text-sm">📅 {new Date(event.date).toLocaleDateString()} at {event.time}</p>
                <p className="text-gray-600 text-sm mt-2">💺 Total: {event.totalSeats} | Booked: {event.bookedSeats?.length}</p>
                <p className="text-gray-600 text-sm">💰 ₹{event.pricePerSeat}</p>
                <p className="text-sm mt-1">
                  ⭐ {event.averageRating ?? "N/A"} | {event.numReviews ?? 0} Reviews
                </p>
                <p className="text-sm mt-1">
                  ✅ Verified:{" "}
                  {event.isVerified ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-gray-500">No</span>
                  )}
                </p>

                <button
                  onClick={() => navigate(`/bookingform/${event._id}`)} // pass event ID in route
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Add Booking
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No events found.</p>
        )}
      </div>
    </div>
  );
}
