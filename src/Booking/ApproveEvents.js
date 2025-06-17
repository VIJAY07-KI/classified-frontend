import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, verifyEvent, unVerifyEvent, deleteEvent } from "./EventSlice";
import { fetchAllUsers } from "./UserSlice";

const ApproveEvents = () => {
  const dispatch = useDispatch();
  const [approve, setApprove] = useState(true);

  const { eventData } = useSelector((state) => state.events);
  const { users, data } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchEvents());
  }, [dispatch]);

  const verifiedEvents = eventData.filter((e) => e.isVerified);
  const unverifedEvents = eventData.filter((e) => !e.isVerified);

  const getOwnerName = (ownerId) => {
    const owner = users.find((u) => u._id === ownerId);
    return owner ? owner.name : "N/A";
  };

  return (
    <div className="flex justify-center mt-20 h-full ">
      <div className="w-[90%] overflow-x-auto">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setApprove(true)}
            className="text-sm border rounded-md bg-green-500 hover:bg-green-700 text-white py-1 px-3"
          >
            Verify Events
          </button>
          <button
            onClick={() => setApprove(false)}
            className="text-sm border rounded-md bg-orange-500 hover:bg-orange-700 text-white py-1 px-3"
          >
            Requested Events
          </button>
        </div>

        <div className="rounded-lg overflow-hidden shadow-md border border-gray-300">
          <h2 className="text-xl font-semibold mb-4 px-4 pt-4">
            {approve ? "Verified Events" : "Unverified Events"}
          </h2>
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Poster</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Seats</th>
                <th className="border px-4 py-2">Booked</th>
                <th className="border px-4 py-2">Owner</th>
                <th className="border px-4 py-2">Status</th>
                {data?.role === "admin" && <th className="border px-4 py-2">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {(approve ? verifiedEvents : unverifedEvents).map((e) => (
                <tr key={e._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{e.title}</td>
                  <td className="border px-4 py-2">
                    {e.posterImage ? (
                      <img
                        src={e.posterImage}
                        alt="poster"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="border px-4 py-2">₹{e.pricePerSeat}</td>
                  <td className="border px-4 py-2">{e.totalSeats}</td>
                  <td className="border px-4 py-2">{e.bookedSeats.length}</td>
                  <td className="border px-4 py-2">{getOwnerName(e.owner)}</td>
                  <td className="border px-4 py-2">
                    {e.isVerified ? "verified" : "Pending"}
                  </td>
                  {data?.role === "admin" && (
                    <td className="border px-4 py-2 space-x-2">
                      {!e.isVerified && (
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                          onClick={() => dispatch(verifyEvent(e._id))}
                        >
                          Verify
                        </button>
                      )}
                      {e.isVerified && (
                        <button
                          className="bg-orange-500 hover:bg-orange-700 text-white px-3 py-1 rounded text-xs"
                          onClick={() => dispatch(unVerifyEvent(e._id))}
                        >
                          Reject
                        </button>
                      )}
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                        onClick={() => dispatch(deleteEvent(e._id))}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApproveEvents;
