import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createEvent, updateEvent } from "./EventSlice"
import { useNavigate } from "react-router-dom"

export default function EventForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [posterImage, setPosterImage] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [pricePerSeat, setPricePerSeat] = useState("")
  const [totalSeats, setTotalSeats] = useState("")
  const [clientErrors, setClientErrors] = useState({})

  const { editId, eventData } = useSelector((state) => state.events)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (editId) {
      const existing = eventData.find((ele) => ele._id === editId)
      if (existing) {
        setTitle(existing.title)
        setDescription(existing.description)
        setPosterImage(existing.posterImage)
        setLocation(existing.location)
        setDate(existing.date?.split("T")[0] || "")
        setTime(convertTo24HourFormat(existing.time))
        setPricePerSeat(existing.pricePerSeat)
        setTotalSeats(existing.totalSeats)
      }
    }
  }, [editId, eventData])

  const convertTo12HourFormat = (time24) => {
    const [hour, minute] = time24.split(":")
    const hourNum = parseInt(hour, 10)
    const ampm = hourNum >= 12 ? "PM" : "AM"
    const hour12 = hourNum % 12 || 12
    return `${hour12}:${minute} ${ampm}`
  }

  const convertTo24HourFormat = (timeStr) => {
    const [time, modifier] = timeStr.split(" ")
    let [hours, minutes] = time.split(":")
    if (modifier === "PM" && hours !== "12") {
      hours = String(parseInt(hours, 10) + 12)
    } else if (modifier === "AM" && hours === "12") {
      hours = "00"
    }
    return `${hours.padStart(2, "0")}:${minutes}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = {}
    const resetForm = () => {
        setTitle('')
        setDescription('')
        setPosterImage('')
        setLocation('')
        setDate('')
        setTime('')
        setPricePerSeat('')
        setTotalSeats('')
    }

    if (title.trim().length === 0 || title.trim().length < 3) {
        errors.title = 'Title is required and should be at least 3 characters'
    }
    if (description.trim().length === 0 || description.trim().length < 5) {
        errors.description = 'Description is required and should be at least 5 characters'
    }
    if (!posterImage.trim()) {
        errors.posterImage = 'Poster image URL is required'
    }
    if (!location.trim()) {
        errors.location = 'Location is required'
    }
    if (!date) {
        errors.date = 'Date is required'
    }
    if (!time) {
        errors.time = 'Time is required'
    }
    if (!pricePerSeat || isNaN(pricePerSeat) || Number(pricePerSeat) <= 0) {
        errors.pricePerSeat = 'Valid price is required'
    }
    if (!totalSeats || isNaN(totalSeats) || Number(totalSeats) <= 0) {
        errors.totalSeats = 'Valid total seats are required'
    }

    if (Object.keys(errors).length > 0) {
        setClientErrors(errors)
    } else {
        const formData = {
            title,
            description,
            posterImage,
            location,
            date: new Date(date).toISOString(),
            time: convertTo12HourFormat(time),
            pricePerSeat: Number(pricePerSeat),
            totalSeats: Number(totalSeats)
        }

        if (editId) {
            const existEvent = eventData.find(ele => ele._id === editId)
            const eventObj = { ...existEvent, ...formData }
            dispatch(updateEvent({ eventObj, resetForm }))
            navigate("/event")
        } else {
            dispatch(createEvent({ formData, resetForm }))
            navigate("/event")
        }

        setClientErrors({})
    }
}


  

      

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          {editId ? "Edit Event" : "Add Event"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-600">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
            {clientErrors.title && <p className="text-red-500 text-sm">{clientErrors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-600">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event description"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
            {clientErrors.description && <p className="text-red-500 text-sm">{clientErrors.description}</p>}
          </div>

          {/* Poster Image */}
          <div>
            <label className="block font-medium text-gray-600">Poster Image URL:</label>
            <input
              type="text"
              value={posterImage}
              onChange={(e) => setPosterImage(e.target.value)}
              placeholder="Image URL"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
            {clientErrors.posterImage && <p className="text-red-500 text-sm">{clientErrors.posterImage}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium text-gray-600">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Event location"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
            {clientErrors.location && <p className="text-red-500 text-sm">{clientErrors.location}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium text-gray-600">Date:</label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
            {clientErrors.date && <p className="text-red-500 text-sm">{clientErrors.date}</p>}
          </div>

          {/* Time */}
          <div>
            <label className="block font-medium text-gray-600">Time:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
            {clientErrors.time && <p className="text-red-500 text-sm">{clientErrors.time}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium text-gray-600">Price Per Seat:</label>
            <input
              type="number"
              value={pricePerSeat}
              onChange={(e) => setPricePerSeat(e.target.value)}
              placeholder="Price"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
            {clientErrors.pricePerSeat && <p className="text-red-500 text-sm">{clientErrors.pricePerSeat}</p>}
          </div>

          {/* Total Seats */}
          <div>
            <label className="block font-medium text-gray-600">Total Seats:</label>
            <input
              type="number"
              value={totalSeats}
              onChange={(e) => setTotalSeats(e.target.value)}
              placeholder="Seats"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
            {clientErrors.totalSeats && <p className="text-red-500 text-sm">{clientErrors.totalSeats}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {editId ? "Update Event" : "Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
