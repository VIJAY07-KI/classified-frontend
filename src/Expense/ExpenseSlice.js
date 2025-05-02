import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Expenses from API
export const fetchExpenses = createAsyncThunk("expenses/fetchExpenses", async () => {
  const res = await axios.get("http://localhost:3035/all-expenses");
  return res.data;
});

// Add New Expense
export const AddExpense = createAsyncThunk(
  "expenses/AddExpense",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3035/create-expense", formData);
      return res.data; // ✅ Return added expense
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add expense"); // ✅ Handle errors properly
    }
  }
);

const ExpenseSlice = createSlice({
  name: "expenses",
  initialState: { data: [], loading: false, serverError: "" },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Expenses Cases
    builder.addCase(fetchExpenses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchExpenses.rejected, (state, action) => {
      state.loading = false;
      state.serverError = action.error?.message || "Something went wrong";
    });

    // Add Expense Cases
    builder.addCase(AddExpense.pending, (state) => {
      state.loading = true;
      state.serverError = "";
    });

    builder.addCase(AddExpense.fulfilled, (state, action) => {
      if (action.payload) {
        state.data.push(action.payload); // ✅ Ensure valid payload before adding
      }
      state.loading = false;
    });

    builder.addCase(AddExpense.rejected, (state, action) => {
      state.loading = false;
      state.serverError = action.payload || "Failed to add expense";
    });
  },
});

export default ExpenseSlice.reducer;




// // import { createSlice } from "@reduxjs/toolkit";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// export const fetchExpenses = createAsyncThunk("expenses/fetchExpenses", async () => {
//   const res = await axios.get("http://localhost:3035/all-expenses");
//   //   console.log(res.data);
//   return res.data;
// });
// export const AddExpense=createAsyncThunk('expenses/AddExpense',async({formData,resetForm})=>{
//   console.log(formData)
//   try{
//     const res=await axios.post('http://localhost:3035/create-expense',formData)
//     console.log(res.data)
//   }catch(err){
//     console.log(err)

//   }
  
// })

// const ExpenseSlice = createSlice({
//   name: "expenses",
//   initialState: { data: [], loading: false, serverError: "" },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchExpenses.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(fetchExpenses.fulfilled, (state, action) => {
//       state.loading = false;
//       state.data = action.payload;
//     });
//     // console.log(state.data);
//     builder.addCase(fetchExpenses.rejected, (state, action) => {
//       state.loading = false;
//       state.serverError = "Something went wrong";
//     });
//     builder.addCase(AddExpense.fulfilled,(state,action)=>{
//           state.data.push(action.payload)
//           state.serverError= ""
//           state.loading = false;
    
//         })
//   },
// });
// export default ExpenseSlice.reducer;