import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./Axios";

// Fetch all events
export const fetchEvents = createAsyncThunk("events/fetchEvents", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/events");
    return response.data;
  } catch (err) {
    return rejectWithValue({ message: err.message, errors: err.response?.data?.error });
  }
});

// Create event
export const createEvent = createAsyncThunk("events/createEvent", async ({ formData, resetForm }, { rejectWithValue }) => {
  try {
    const response = await axios.post("/event", formData, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    resetForm();
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.log(err)
    return rejectWithValue({ message: err.message });
  }
});

// Update event
export const updateEvent = createAsyncThunk("events/updateEvent", async ({ eventObj, resetForm }, { rejectWithValue }) => {
  console.log(eventObj)
  try {
    const response = await axios.put(`/event/${eventObj._id}`, eventObj, {
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

// Delete event
export const deleteEvent = createAsyncThunk("events/deleteEvent", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/event/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return response.data;
  } catch (err) {
    return rejectWithValue({ message: err.message, errors: err.code });
  }
});

// Event Details
export const eventDetails = createAsyncThunk("events/eventDetails", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/event/${id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue({ message: err.message, errors: err.response?.data?.errors });
  }
});
export const verifyEvent = createAsyncThunk("events/verifyEvent", async (id, { rejectWithValue }) => {
  console.log(id)
  try {
    const response = await axios.put(`/event/verify/${id}`, {isVerified:true}, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.log(err)
    return rejectWithValue({ message: err.message, errors: err.response?.data?.errors });
  }
});

export const unVerifyEvent = createAsyncThunk("events/unVerifyEvent", async (id, { rejectWithValue }) => {
  // console.log(eventObj)
  try {
    const response = await axios.put(`/event/verify/${id}`, {isVerified:false}, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.log(err)
    return rejectWithValue({ message: err.message, errors: err.response?.data?.errors });
  }
});


const EventSlice = createSlice({
  name: "events",
  initialState: {
    eventData: [],
    loading: false,
    serverErr: null,
    editId: null,
    event: null,
  },
  reducers: {
    assignEditId: (state, action) => {
      state.editId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.serverErr = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.eventData = action.payload;
        state.loading = false;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.serverErr = action.payload;
        state.loading = false;
      })

      .addCase(createEvent.fulfilled, (state, action) => {
        state.eventData.push(action.payload);
        state.loading = false;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.serverErr = action.payload;
        state.loading = false;
      })

      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.eventData.findIndex((ele) => ele._id === action.payload._id);
        state.eventData[index] = action.payload;
        state.editId = null;
        state.loading = false;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.serverErr = action.payload;
        state.loading = false;
      })

      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.eventData = state.eventData.filter((ele) => ele._id !== action.payload._id);
        state.loading = false;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.serverErr = action.payload;
        state.loading = false;
      })

      .addCase(eventDetails.fulfilled, (state, action) => {
        state.event = action.payload;
        state.loading = false;
      })
      .addCase(eventDetails.rejected, (state, action) => {
        state.serverErr = action.payload;
        state.loading = false;
      })
      //approveEvent
       .addCase(verifyEvent.fulfilled, (state, action) => {
        const index = state.eventData.findIndex((ele) => ele._id === action.payload._id);
        state.eventData[index] = action.payload;
        state.editId = null;
        state.loading = false;
      })
      .addCase(verifyEvent.rejected, (state, action) => {
        state.serverErr = action.payload;
        state.loading = false;
      })
      //rejectEvent
      .addCase(unVerifyEvent.fulfilled, (state, action) => {
        const index = state.eventData.findIndex((ele) => ele._id === action.payload._id);
        state.eventData[index] = action.payload;
        state.editId = null;
        state.loading = false;
      })
      .addCase(unVerifyEvent.rejected, (state, action) => {
        state.serverErr = action.payload;
        state.loading = false;
      })
  },
});

export const { assignEditId } = EventSlice.actions;
export default EventSlice.reducer;
