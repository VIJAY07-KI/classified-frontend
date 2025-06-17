// import { useDispatch, useSelector } from "react-redux";
// import { fetchBookings, deleteBooking } from "./BookingSlice";
// import { useEffect } from "react";

// export default function Booking() {
//   const dispatch = useDispatch();
//   const { bookingData, loading, serverErr } = useSelector((state) => state.bookings);
//   const {data}=useSelector((state)=>{
//     return state.user
//   })

//   useEffect(() => {
//     dispatch(fetchBookings());
//   }, [dispatch]);
// const userBooking=bookingData.filter((ele)=>ele.user==data._id)
//   if (loading) return <p className="text-center mt-6 text-gray-600">Loading...</p>;
//   if (serverErr) return <p className="text-center text-red-500">Error: {serverErr.message || serverErr}</p>;

//   return (
//     <div className="bg-sky-100 min-h-screen p-6">
//       <div className="max-w-full overflow-x-auto bg-white p-6 rounded-lg shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-semibold text-gray-700">
//             Total Bookings - {data.role=='admin'?bookingData.length:userBooking.length}
//           </h2>
//         </div>

//         {bookingData.length > 0 ? (
//           <table className="min-w-[1200px] w-full text-sm text-left border border-gray-200 rounded overflow-x-auto">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-4 py-2 border">User</th>
//                 <th className="px-4 py-2 border">Event</th>
//                 <th className="px-4 py-2 border">Seats Booked</th>
//                 <th className="px-4 py-2 border">Total Price</th>
//                 <th className="px-4 py-2 border">Booking Date</th>
//                 <th className="px-4 py-2 border">Status</th>
//                {data.role=='buyer' && <th className="px-4 py-2 border text-center">Actions</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {data.role=='admin'?bookingData:userBooking.map((booking) => (
//                 <tr key={booking._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border">{booking.user?.name || "N/A"}</td>
//                   <td className="px-4 py-2 border">{booking.event?.title || "N/A"}</td>
//                   <td className="px-4 py-2 border">{booking.seats.length}</td>
//                   <td className="px-4 py-2 border">₹{booking.totalAmount}</td>
//                   <td className="px-4 py-2 border">
//                     {new Date(booking.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <span
//                       className={`px-2 py-1 rounded text-sm font-medium ${
//                         booking.paymentStatus === "success"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {booking.paymentStatus}
//                     </span>
//                   </td>
//                  {data.role=='buyer' && <td className="px-4 py-2 border text-center space-x-2">
//                     <button
//                       onClick={() => {
//                         const confirmDelete = window.confirm("Cancel this booking?");
//                         if (confirmDelete) {
//                           dispatch(deleteBooking(booking._id));
//                         }
//                       }}
//                       className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                     >
//                       Cancel
//                     </button>
//                   </td>}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-center text-gray-500 mt-4">No bookings found.</p>
//         )}
//       </div>
//     </div>
//   );
// }
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBookings, deleteBooking } from "./BookingSlice";
import { useEffect } from "react";

export default function Booking() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { bookingData, loading, serverErr } = useSelector((state) => state.bookings);
  const { data } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-6 text-gray-600">Loading...</p>;
  if (serverErr) return <p className="text-center text-red-500">Error: {serverErr.message || serverErr}</p>;

  const userBookings = bookingData?.filter((b) => b.user === data._id || b.user?._id === data._id) || [];
  const bookingsToShow = data.role === "admin" ? bookingData : userBookings;

  return (
    <div className="bg-sky-100 min-h-screen p-6 mt-10">
      <div className="max-w-full overflow-x-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Total Bookings - {bookingsToShow.length}
          </h2>
        </div>

        {bookingsToShow.length > 0 ? (
          <table className="min-w-[1200px] w-full text-sm text-left border border-gray-200 rounded overflow-x-auto">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Event</th>
                <th className="px-4 py-2 border">Seats Booked</th>
                <th className="px-4 py-2 border">Total Price</th>
                <th className="px-4 py-2 border">Booking Date</th>
                <th className="px-4 py-2 border">Status</th>
                {data.role === "buyer" && (
                  <th className="px-4 py-2 border text-center">Actions</th>
                )}
                 {data.role === "buyer" && (
                  <th className="px-4 py-2 border text-center">Info</th>
                )}
              </tr>
            </thead>
            <tbody>
              {bookingsToShow.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{booking.user?.name || "N/A"}</td>
                  <td className="px-4 py-2 border">{booking.event?.title || "N/A"}</td>
                  <td className="px-4 py-2 border">{booking.seats?.length || 0}</td>
                  <td className="px-4 py-2 border">₹{booking.totalAmount}</td>
                  <td className="px-4 py-2 border">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        booking.paymentStatus === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                  {data.role === "buyer" && (
                    <td className="px-4 py-2 border text-center space-x-2">
                      <button
                        onClick={() => {
                          const confirmDelete = window.confirm("Cancel this booking?");
                          if (confirmDelete) {
                            dispatch(deleteBooking(booking._id));
                          }
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Cancel
                      </button>
                    </td>
                  )}
                  {data.role === "buyer" && (
                    <td className="px-4 py-2 border text-center space-x-2">
                      <button
                        onClick={() => {
                          navigate(`/ticket/${booking._id}`)
                        }}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        View
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 mt-4">No bookings found.</p>
        )}
      </div>
    </div>
  );
}
