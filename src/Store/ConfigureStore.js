import { configureStore } from "@reduxjs/toolkit";
import EventSlice from "../Booking/EventSlice.js"
import  ReviewSlice from "../Booking/ReviewSlice"
import BookingSlice from "../Booking/BookingSlice"
import UserSlice from "../Booking/UserSlice"
const store = configureStore({
  reducer: {
    reviews:ReviewSlice,
    user:UserSlice,
    bookings:BookingSlice,
    events:EventSlice
  },
});
export default store;
