import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./Axios";

// Fetch all bookings
export const fetchBookings = createAsyncThunk("bookings/fetchBookings", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/bookings");
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.log(err)
    return rejectWithValue({ message: err.message, errors: err.response?.data?.error });
  }
});

// Create a booking
export const createBooking = createAsyncThunk("bookings/createBooking", async ({ formData}, { rejectWithValue }) => {
  try {
    const response = await axios.post("/booking", formData, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    // resetForm();
     console.log(response.data)
    return response.data;
  } catch (err) {
     console.log(err)
    return rejectWithValue({ message: err.message });
  }
});

// Update a booking
export const updateBooking = createAsyncThunk("bookings/updateBooking", async ({ bookingObj, resetForm }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/booking/${bookingObj._id}`, bookingObj, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    resetForm();
     console.log(response.data)
    return response.data;
  } catch (err) {
     console.log(err)
    return rejectWithValue({ message: err.message, errors: err.response?.data?.errors });
  }
});

// Delete a booking
export const deleteBooking = createAsyncThunk("bookings/deleteBooking", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/booking/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return response.data;
  } catch (err) {
    return rejectWithValue({ message: err.message });
  }
});
export const statusUpdate = createAsyncThunk("bookings/statusUpdate", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`/booking/status/${id}`,{}, {
      headers: { Authorization: localStorage.getItem("token") }
    });
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.log(err)
    return rejectWithValue({ message: err.message });
  }
});

const BookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookingData: [],
    loading: false,
    serverError: null,
    editId: null,
  },
  reducers: {
    assignEditId: (state, action) => {
      state.editId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.serverError = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookingData = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.serverError = action.payload;
        state.loading = false;
      })

      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookingData.push(action.payload);
        state.loading = false;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.serverError = action.payload;
        state.loading = false;
      })

      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookingData.findIndex((b) => b._id === action.payload._id);
        state.bookingData[index] = action.payload;
        state.editId = null;
        state.loading = false;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.serverError = action.payload;
        state.loading = false;
      })

      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookingData = state.bookingData.filter((b) => b._id !== action.payload._id);
        state.loading = false;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.serverError = action.payload;
        state.loading = false;
      })

      //statusUpdate
      .addCase(statusUpdate.fulfilled, (state, action) => {
        const index = state.bookingData.findIndex((b) => b._id === action.payload._id);
        state.bookingData[index] = action.payload;
        // state.editId = null;
        state.loading = false;
      })
      .addCase(statusUpdate.rejected, (state, action) => {
        state.serverError = action.payload;
        state.loading = false;
      })
  },
});

export const { assignEditId } = BookingSlice.actions;
export default BookingSlice.reducer;
