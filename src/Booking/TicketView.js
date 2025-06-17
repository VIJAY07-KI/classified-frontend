// src/components/TicketView.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import axios from './Axios'

export default function TicketView() {
  const {id} = useParams();
  console.log(id)
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTicket() {
      try {
        const res = await axios.get(`/booking/${id}`,{headers:{Authorization:localStorage.getItem('token')}});
        const data = res.data
        console.log(res.data)
        setTicket(data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setLoading(false);
      }
    }
    getTicket();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading Ticket...</p>;
  if (!ticket) return <p className="text-center text-red-500">Ticket not found.</p>;

  const { user,event, seats } = ticket;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <img
          src={event.posterImage || "https://via.placeholder.com/400x200?text=Event+Poster"}
          alt={event.title}
          className="rounded-lg w-full h-48 object-cover mb-4"
        />
        <h1 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h1>
        <p className="text-sm text-gray-600">📅 {new Date(event.date).toLocaleDateString()} at {event.time}</p>
        <p className="text-sm text-gray-600 mb-2">📍 {event.location}</p>
        <hr className="my-3" />
        <p className="text-sm">🎟️ <strong>Seats:</strong> {seats.join(", ")}</p>
        <p className="text-sm">👤 <strong>Name:</strong> {user.name}</p>
        <p className="text-sm">📧 <strong>Email:</strong> {user.email}</p>

        <div className="flex justify-center mt-5">
          <QRCode value={id} size={100} />
        </div>
        <p className="text-center text-xs text-gray-400 mt-3">Scan at entry gate</p>
      </div>
    </div>
  );
}
