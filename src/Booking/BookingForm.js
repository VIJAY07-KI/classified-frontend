
  // import { useEffect, useState } from "react";
  // import { useDispatch } from "react-redux";
  // import { createBooking } from "./BookingSlice";
  // import { useNavigate, useParams } from "react-router-dom";
  // import axios from "axios";

  // export default function BookingForm() {
  //   const [event, setEvent] = useState(null);
  //   const [selectedSeats, setSelectedSeats] = useState([]);
  //   const [clientErrors, setClientErrors] = useState({});
  //   const [loading, setLoading] = useState(true);
  //   const [serverErr, setServerErr] = useState(null);

  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const { id } = useParams();

  //   // Sample seat layout: 5 rows x 10 columns (A1 - E10)
  //   const rows = ["A", "B", "C", "D", "E"];
  //   const columns = Array.from({ length: 10 }, (_, i) => i + 1);

  //   const toggleSeat = (seat) => {
  //     setSelectedSeats((prev) =>
  //       prev.includes(seat)
  //         ? prev.filter((s) => s !== seat)
  //         : [...prev, seat]
  //     );
  //   };

  //   useEffect(() => {
  //     const fetchEvent = async () => {
  //       try {
  //         const res = await axios.get(`http://localhost:3777/event/${id}`, {
  //           headers: { Authorization: localStorage.getItem("token") },
  //         });
  //         setEvent(res.data);
  //         setLoading(false);
  //       } catch (err) {
  //         console.error(err);
  //         setServerErr("Failed to load event");
  //         setLoading(false);
  //       }
  //     };

  //     fetchEvent();
  //   }, [id]);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const errors = {};

  //     if (selectedSeats.length === 0) {
  //       errors.seats = "Please select at least one seat";
  //     }

  //     if (!event?._id) {
  //       errors.event = "Event not found";
  //     }

  //     if (Object.keys(errors).length > 0) {
  //       setClientErrors(errors);
  //     } else {
  //       const formData = {
  //         event: event._id,
  //         seats: selectedSeats,
  //         totalAmount: selectedSeats.length * event.pricePerSeat,
  //       };

  //       dispatch(createBooking({ formData }));
  //       navigate("/booking");
  //     }
  //   };

  //   if (loading) return <p className="text-center mt-6">Loading event details...</p>;
  //   if (serverErr) return <p className="text-center text-red-500 mt-6">{serverErr}</p>;

  //   return (
  //     // <div className="flex justify-center">
  //     //   <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
  //     //     <h3 className="text-xl font-semibold text-gray-700 mb-4">
  //     //       Book Tickets for: {event?.title}
  //     //     </h3>

  //     //     <form onSubmit={handleSubmit} className="space-y-6">
  //     //       {/* Seat Grid */}
  //     //       <div>
  //     //         <label className="block font-medium text-gray-600 mb-2">Select Seats:</label>
  //     //         <div className="grid grid-cols-10 gap-2">
  //     //           {rows.map((row) =>
  //     //             columns.map((col) => {
  //     //               const seatId = `${row}${col}`;
  //     //               const isSelected = selectedSeats.includes(seatId);

  //     //               return (
  //     //                 <button
  //     //                   type="button"
  //     //                   key={seatId}
  //     //                   onClick={() => toggleSeat(seatId)}
  //     //                   className={`w-10 h-10 rounded text-sm font-medium ${
  //     //                     isSelected
  //     //                       ? "bg-green-600 text-white"
  //     //                       : "bg-gray-200 text-gray-800 hover:bg-blue-400"
  //     //                   }`}
  //     //                 >
  //     //                   {seatId}
  //     //                 </button>
  //     //               );
  //     //             })
  //     //           )}
  //     //         </div>
  //     //         {clientErrors.seats && (
  //     //           <p className="text-red-500 text-sm mt-2">{clientErrors.seats}</p>
  //     //         )}
  //     //       </div>

  //     //       {/* Price Info */}
  //     //       <div>
  //     //         <label className="block font-medium text-gray-600">Total Amount (₹):</label>
  //     //         <input
  //     //           type="text"
  //     //           readOnly
  //     //           value={selectedSeats.length * event.pricePerSeat}
  //     //           className="w-full border rounded px-3 py-2 mt-1 bg-gray-100 text-gray-700"
  //     //         />
  //     //       </div>

  //     //       {/* Submit Button */}
  //     //       <div>
  //     //         <button
  //     //           type="submit"
  //     //           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
  //     //         >
  //     //           Book Now
  //     //         </button>
  //     //       </div>
  //     //     </form>
  //     //   </div>
  //     // </div>
  //     <div className="flex justify-center">
  //   <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
  //     <h3 className="text-xl font-semibold text-gray-700 mb-4">
  //       Book Tickets for: {event?.title}
  //     </h3>

  //     <form onSubmit={handleSubmit} className="space-y-6">
  //       {/* Seat Grid */}
  //       <div>
  //         <label className="block font-medium text-gray-600 mb-2">Select Seats:</label>

  //         <div className="flex">
  //           {/* Row Labels */}
  //           <div className="flex flex-col mr-2">
  //             {Array(Math.max(Math.ceil(allSeats.length / (event?.seatsPerRow || 10)), 0))
  //               .fill(0)
  //               .map((_, idx) => {
  //                 // Supports AA, AB, ... labels if you want
  //                 const getRowLabel = (index) => {
  //                   let label = '';
  //                   let i = index;
  //                   while (i >= 0) {
  //                     label = String.fromCharCode((i % 26) + 65) + label;
  //                     i = Math.floor(i / 26) - 1;
  //                   }
  //                   return label;
  //                 };
  //                 return (
  //                   <div
  //                     key={idx}
  //                     className="h-10 flex items-center justify-center font-semibold text-gray-600"
  //                     style={{ height: '40px' }}
  //                   >
  //                     {getRowLabel(idx)}
  //                   </div>
  //                 );
  //               })}
  //           </div>

  //           {/* Seats Grid */}
  //           <div
  //             className="grid gap-2"
  //             style={{
  //               gridTemplateColumns: `repeat(${event?.seatsPerRow || 10}, 40px)`,
  //             }}
  //           >
  //             {allSeats.map((seatId) => {
  //               const isBooked = bookedSeats.includes(seatId);
  //               const isSelected = selectedSeats.includes(seatId);

  //               return (
  //                 <button
  //                   type="button"
  //                   key={seatId}
  //                   disabled={isBooked}
  //                   onClick={() => !isBooked && toggleSeat(seatId)}
  //                   className={`w-10 h-10 rounded text-xs font-medium transition duration-200
  //                     ${
  //                       isBooked
  //                         ? "bg-red-600 text-white cursor-not-allowed"
  //                         : isSelected
  //                         ? "bg-green-600 text-white"
  //                         : "bg-gray-200 text-gray-800 hover:bg-blue-400"
  //                     }
  //                   `}
  //                   title={`Seat ${seatId}`}
  //                 >
  //                   {/* Show only seat number, e.g. 1, 2, 3 */}
  //                   {seatId.match(/\d+/)}
  //                 </button>
  //               );
  //             })}
  //           </div>
  //         </div>

  //         {clientErrors.seats && (
  //           <p className="text-red-500 text-sm mt-2">{clientErrors.seats}</p>
  //         )}
  //       </div>

  //       {/* Price Info */}
  //       <div>
  //         <label className="block font-medium text-gray-600">Total Amount (₹):</label>
  //         <input
  //           type="text"
  //           readOnly
  //           value={selectedSeats.length * event?.pricePerSeat || 0}
  //           className="w-full border rounded px-3 py-2 mt-1 bg-gray-100 text-gray-700"
  //         />
  //       </div>

  //       {/* Submit Button */}
  //       <div>
  //         <button
  //           type="submit"
  //           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
  //         >
  //           Book Now
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // </div>

  //   );
  // }


  import { useEffect, useState } from "react";
  import { useDispatch } from "react-redux";
  import { createBooking } from "./BookingSlice";
  import { useNavigate, useParams } from "react-router-dom";
  import axios from "axios";

  export default function BookingForm() {
    const [event, setEvent] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [clientErrors, setClientErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [serverErr, setServerErr] = useState(null);
    const [allSeats, setAllSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const toggleSeat = (seat) => {
      setSelectedSeats((prev) =>
        prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
      );
    };

    useEffect(() => {
      const fetchEvent = async () => {
        try {
          const res = await axios.get(`http://localhost:3777/event/${id}`, {
            headers: { Authorization: localStorage.getItem("token") },
          });
          setEvent(res.data);
          setBookedSeats(res.data.bookedSeats || []);
          setLoading(false);
        } catch (err) {
          console.error(err);
          setServerErr("Failed to load event");
          setLoading(false);
        }
      };

      fetchEvent();
    }, [id]);

    // Generate seats based on event data
    useEffect(() => {
      if (event) {
        const totalSeats = event.totalSeats || 50;
        const seatsPerRow = event.seatsPerRow || 10;
        const rowsCount = Math.ceil(totalSeats / seatsPerRow);

        const seats = [];
        for (let row = 0; row < rowsCount; row++) {
          const rowLabel = String.fromCharCode(65 + row); // A, B, C...
          for (let col = 1; col <= seatsPerRow; col++) {
            const seatId = `${rowLabel}${col}`;
            seats.push(seatId);
            if (seats.length === totalSeats) break;
          }
        }
        setAllSeats(seats);
      }
    }, [event]);

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   const errors = {};

    //   if (selectedSeats.length === 0) {
    //     errors.seats = "Please select at least one seat";
    //   }

    //   if (!event?._id) {
    //     errors.event = "Event not found";
    //   }

    //   if (Object.keys(errors).length > 0) {
    //     setClientErrors(errors);
    //   } else {
    //     const formData = {
    //       event: event._id,
    //       seats: selectedSeats,
    //       totalAmount: selectedSeats.length * event.pricePerSeat,
    //     };

    //     dispatch(createBooking({ formData }));
    //     navigate(`payment/${}`);
    //   }
    // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  const errors = {};

  if (selectedSeats.length === 0) {
    errors.seats = "Please select at least one seat";
  }

  if (!event?._id) {
    errors.event = "Event not found";
  }

  if (Object.keys(errors).length > 0) {
    setClientErrors(errors);
  } else {
    const formData = {
      event: event._id,
      seats: selectedSeats,
      totalAmount: selectedSeats.length * event.pricePerSeat,
    };

    try {
      const booking = await dispatch(createBooking({ formData })).unwrap(); // get booking data
      console.log("Created Booking:", booking); // booking._id is available here
      navigate(`/payment/${booking._id}`);
    } catch (err) {
      console.error("Booking creation failed:", err);
      setServerErr("Booking failed. Try again.");
    }
  }
};

    if (loading) return <p className="text-center mt-6">Loading event details...</p>;
    if (serverErr) return <p className="text-center text-red-500 mt-6">{serverErr}</p>;

    return (
      <div className="flex justify-center mt-20">
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Book Tickets for: {event?.title}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seat Grid */}
            <div>
              <label className="block font-medium text-gray-600 mb-2">Select Seats:</label>

              <div className="flex">
                {/* Row Labels */}
                <div className="flex flex-col mr-2">
                  {Array(Math.ceil(allSeats.length / (event?.seatsPerRow || 10)))
                    .fill(0)
                    .map((_, idx) => {
                      const rowLabel = String.fromCharCode(65 + idx);
                      return (
                        <div
                          key={idx}
                          className="h-10 flex items-center justify-center font-semibold text-gray-600"
                          style={{ height: "40px" }}
                        >
                          {rowLabel}
                        </div>
                      );
                    })}
                </div>

                {/* Seats Grid */}
                <div
                  className="grid gap-2"
                  style={{
                    gridTemplateColumns: `repeat(${event?.seatsPerRow || 10}, 40px)`,
                  }}
                >
                  {allSeats.map((seatId) => {
                    const isBooked = bookedSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);

                    return (
                      <button
                        type="button"
                        key={seatId}
                        disabled={isBooked}
                        onClick={() => !isBooked && toggleSeat(seatId)}
                        className={`w-10 h-10 rounded text-xs font-medium transition duration-200
                          ${
                            isBooked
                              ? "bg-red-600 text-white cursor-not-allowed"
                              : isSelected
                              ? "bg-green-600 text-white"
                              : "bg-gray-200 text-gray-800 hover:bg-blue-400"
                          }
                        `}
                        title={`Seat ${seatId}`}
                      >
                        {seatId.match(/\d+/)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {clientErrors.seats && (
                <p className="text-red-500 text-sm mt-2">{clientErrors.seats}</p>
              )}
            </div>

            {/* Price Info */}
            <div>
              <label className="block font-medium text-gray-600">Total Amount (₹):</label>
              <input
                type="text"
                readOnly
                value={selectedSeats.length * (event?.pricePerSeat || 0)}
                className="w-full border rounded px-3 py-2 mt-1 bg-gray-100 text-gray-700"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
