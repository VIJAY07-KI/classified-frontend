// import { useDispatch, useSelector } from "react-redux";
// import { deleteEvent, fetchEvents, assignEditId } from "./EventSlice";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Event() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { eventData, loading, serverErr } = useSelector((state) => state.events);

//   useEffect(() => {
//     dispatch(fetchEvents());
//   }, [dispatch]);

//   if (loading) return <p className="text-center mt-6 text-gray-600">Loading...</p>;
//   if (serverErr) return <p className="text-center text-red-500">Error: {serverErr.message || serverErr}</p>;

//   return (
//     <div className="bg-sky-100 min-h-screen p-6">
//       <div className="max-w-full overflow-x-auto bg-white p-6 rounded-lg shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-semibold text-gray-700">
//             Total Events - {eventData.length}
//           </h2>
//           <button
//             onClick={() => navigate("/eventform")}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
//           >
//             Add Event
//           </button>
//         </div>

//         {eventData.length > 0 ? (
//           <table className="min-w-[1200px] w-full text-sm text-left border border-gray-200 rounded overflow-x-auto">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-4 py-2 border">Title</th>
//                 <th className="px-4 py-2 border">Description</th>
//                 <th className="px-4 py-2 border">Poster</th>
//                 <th className="px-4 py-2 border">Location</th>
//                 <th className="px-4 py-2 border">Date</th>
//                 <th className="px-4 py-2 border">Time</th>
//                 <th className="px-4 py-2 border">Price</th>
//                 <th className="px-4 py-2 border">Total Seats</th>
//                 <th className="px-4 py-2 border">AvailableSeats</th>
//                 <th className="px-4 py-2 border">Booked</th>
//                 <th className="px-4 py-2 border">Rating</th>
//                 <th className="px-4 py-2 border">Reviews</th>
//                 <th className="px-4 py-2 border">Verified</th>
//                 <th className="px-4 py-2 border text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {eventData.map((event) => (
//                 <tr key={event._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border">{event.title}</td>
//                   <td className="px-4 py-2 border">{event.description?.slice(0, 40)}...</td>
//                   <td className="px-4 py-2 border">
//                     {event.posterImage ? (
//                       <img src={event.posterImage} alt="poster" className="w-16 h-16 object-cover rounded" />
//                     ) : (
//                       "N/A"
//                     )}
//                   </td>
//                   <td className="px-4 py-2 border">{event.location}</td>
//                   <td className="px-4 py-2 border">{new Date(event.date).toLocaleDateString()}</td>
//                   <td className="px-4 py-2 border">{event.time}</td>
//                   <td className="px-4 py-2 border">₹{event.pricePerSeat}</td>
//                   <td className="px-4 py-2 border">{event.totalSeats}</td>
//                   <td className="px-4 py-2 border">{event.totalSeats-event.bookedSeats.length}</td>
//                   <td className="px-4 py-2 border">{event.bookedSeats?.length}</td>
//                   <td className="px-4 py-2 border">{event.averageRating ?? "N/A"}</td>
//                   <td className="px-4 py-2 border">{event.numReviews ?? 0}</td>
//                   <td className="px-4 py-2 border">
//                     {event.isVerified ? (
//                       <span className="text-green-600 font-semibold">Yes</span>
//                     ) : (
//                       <span className="text-gray-500">No</span>
//                     )}
//                   </td>
//                   <td className="px-4 py-2 border text-center space-x-2">
//                     <button
//                       onClick={() => {
//                         dispatch(assignEditId(event._id));
//                         navigate("/eventform");
//                       }}
//                       className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => {
//                         const confirmDelete = window.confirm("Are you sure you want to delete this event?");
//                         if (confirmDelete) {
//                           dispatch(deleteEvent(event._id));
//                         }
//                       }}
//                       className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-center text-gray-500 mt-4">No events found.</p>
//         )}
//       </div>
//     </div>
//   );
// }
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, fetchEvents, assignEditId } from "./EventSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Event() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventData, loading, serverErr } = useSelector((state) => state.events);
  const { data: user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Filter events based on user role
  const eventsToShow =
    user.role === "admin"
      ? eventData
      : eventData.filter((event) => event.eventManager === user._id);

  if (loading) return <p className="text-center mt-6 text-gray-600">Loading...</p>;
  if (serverErr) return <p className="text-center text-red-500">Error: {serverErr.message || serverErr}</p>;

  return (
    <div className="bg-sky-100 min-h-screen p-6 mt-10">
     {user.role === "admin"&& <button
                    onClick={() => navigate("/approveevents")}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-md shadow-md transition duration-200"
                >
                    VerifyEvents
                </button>}
      <div className="max-w-full overflow-x-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Total Events - {eventsToShow.length}
          </h2>
          {( user.role === "event-manager") && (
            <button
              onClick={() => navigate("/eventform")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
              Add Event
            </button>
          )}
        </div>

        {eventsToShow.length > 0 ? (
          <table className="min-w-[1200px] w-full text-sm text-left border border-gray-200 rounded overflow-x-auto">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Poster</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Time</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Total Seats</th>
                <th className="px-4 py-2 border">Available Seats</th>
                <th className="px-4 py-2 border">Booked</th>
                <th className="px-4 py-2 border">Rating</th>
                <th className="px-4 py-2 border">Reviews</th>
                <th className="px-4 py-2 border">Verified</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {eventsToShow.map((event) => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{event.title}</td>
                  <td className="px-4 py-2 border">
                    {event.description?.slice(0, 40)}...
                  </td>
                  <td className="px-4 py-2 border">
                    {event.posterImage ? (
                      <img
                        src={event.posterImage}
                        alt="poster"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-4 py-2 border">{event.location}</td>
                  <td className="px-4 py-2 border">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">{event.time}</td>
                  <td className="px-4 py-2 border">₹{event.pricePerSeat}</td>
                  <td className="px-4 py-2 border">{event.totalSeats}</td>
                  <td className="px-4 py-2 border">
                    {event.totalSeats - (event.bookedSeats?.length || 0)}
                  </td>
                  <td className="px-4 py-2 border">
                    {event.bookedSeats?.length || 0}
                  </td>
                  <td className="px-4 py-2 border">
                    {event.averageRating ?? "N/A"}
                  </td>
                  <td className="px-4 py-2 border">
                    {event.numReviews ?? 0}
                  </td>
                  <td className="px-4 py-2 border">
                    {event.isVerified ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    {(user.role === "admin" || event.eventManager === user._id) && (
                      <>
                        <button
                          onClick={() => {
                            dispatch(assignEditId(event._id));
                            navigate("/eventform");
                          }}
                          className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            const confirmDelete = window.confirm("Are you sure you want to delete this event?");
                            if (confirmDelete) {
                              dispatch(deleteEvent(event._id));
                            }
                          }}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 mt-4">No events found.</p>
        )}
      </div>
    </div>
  );
}
