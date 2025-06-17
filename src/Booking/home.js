import React from "react";
import { Link } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "Luxury Wedding Expo",
    date: "June 15, 2025",
    venue: "The Leela Palace, Delhi",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKAuzpkvh-mTw7ULBuaty8WKjoKvUxQD9IPg&s",
  },
  {
    id: 2,
    title: "Rockstar DSP",
    date: "July 2, 2025",
    venue: "hitech city, Hyderabad",
    image: "https://www.radioandmusic.com/sites/www.radioandmusic.com/files/images/entertainment/2024/08/12/rockstardd.jpg",
  },
  {
    id: 3,
    title: "Audio Function",
    date: "August 10, 2025",
    venue: "BKC, Mumbai",
    image: "https://www.idlebrain.com/news/functions/audio-ragada/images/audio-ragada3.jpg",
  },
];

export default function HomePage() {
  return (
    <div className="bg-red text-black min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
      
        <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 mb-4">
          Welcome to Event Booking
        </h1>
        <p className="text-lg md:text-xl text-black-300 max-w-2xl">
          Discover, book and enjoy top-rated events around you — weddings, concerts, conferences & more.
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            to="/event"
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-semibold transition"
          >
            Explore Events
          </Link>
          <Link
            to="/register"
            className="bg-grey  hover:bg-blue -200 text-black px-6 py-3 rounded-full font-semibold transition"
          >
            Register
          </Link>
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-gray-900 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-yellow-400 mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white text-black rounded-xl overflow-hidden shadow-lg hover:scale-105 transition transform"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-gray-700">{event.date}</p>
                  <p className="text-gray-600 mb-2">{event.venue}</p>
                  <Link
                    to="/event"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Book Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
