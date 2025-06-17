import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./Axios";

// Fetch all reviews
export const fetchReviews = createAsyncThunk("reviews/fetchReviews", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/reviews");
    return response.data;
  } catch (err) {
    return rejectWithValue({ message: err.message, errors: err.response?.data?.error });
  }
});

// Create review
export const createReview = createAsyncThunk("reviews/createReview", async ({ formData, resetForm }, { rejectWithValue }) => {
  try {
    const response = await axios.post("/review", formData, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    resetForm();
    return response.data;
  } catch (err) {
    return rejectWithValue({ message: err.message });
  }
});

// Update review
export const updateReview = createAsyncThunk("reviews/updateReview", async ({ reviewObj, resetForm }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/review/${reviewObj._id}`, reviewObj, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    resetForm();
    return response.data;
  } catch (err) {
    return rejectWithValue({ message: err.message, errors: err.response?.data?.errors });
  }
});

// Delete review
export const deleteReview = createAsyncThunk("reviews/deleteReview", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/review/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return { _id: id }; // Returning deleted id
  } catch (err) {
    return rejectWithValue({ message: err.message, errors: err.code });
  }
});

// Review details
export const reviewDetails = createAsyncThunk("reviews/reviewDetails", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/review/${id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue({ message: err.message, errors: err.response?.data?.errors });
  }
});

const ReviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviewData: [],
    loading: false,
    severError: null,
    editId: null,
    review: null,
  },
  reducers: {
    assignEditId: (state, action) => {
      state.editId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.severError = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviewData = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.severError = action.payload;
        state.loading = false;
      })

      // Create
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.severError = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviewData.push(action.payload);
        state.loading = false;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.severError = action.payload;
        state.loading = false;
      })

      // Update
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.severError = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviewData.findIndex((ele) => ele._id === action.payload._id);
        state.reviewData[index] = action.payload;
        state.editId = null;
        state.loading = false;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.severError = action.payload;
        state.loading = false;
      })

      // Delete
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.severError = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviewData = state.reviewData.filter((ele) => ele._id !== action.payload._id);
        state.loading = false;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.severError = action.payload;
        state.loading = false;
      })

      // Get review details
      .addCase(reviewDetails.pending, (state) => {
        state.loading = true;
        state.severError = null;
      })
      .addCase(reviewDetails.fulfilled, (state, action) => {
        state.review = action.payload;
        state.loading = false;
      })
      .addCase(reviewDetails.rejected, (state, action) => {
        state.severError = action.payload;
        state.loading = false;
      });
  },
});

export const { assignEditId } = ReviewSlice.actions;
export default ReviewSlice.reducer;
