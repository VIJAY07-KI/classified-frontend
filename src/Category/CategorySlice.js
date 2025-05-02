


// import { createSlice } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const res = await axios.get("http://localhost:3046/categories");
  //   console.log(res.data);
  return res.data;
});
export const addCategory = createAsyncThunk("categories/addCategory",async ({formData,resetForm},{rejectWithValue}) =>{
  try{
    const res= await axios.post("http://localhost:3046/category",formData);
    resetForm();
    console.log(res.data)
    return res.data;

  }catch(err){
    console.log(err)
    return rejectWithValue({
      message:err.message,
      errors : err.res.data.errors
    })
  }
} )

// export const updateCategory = createAsyncThunk ("categories/updateCategory", async ({categoryObj,resetForm},{rejectWithValue})=>{
//   try{
//     const res= await axios.put(`http://localhost:3035/update-category${categoryObj._id}`,categoryObj)
//     resetForm();
//     return res.data

//   }catch(err){
//     return rejectWithValue({
//       message:err.message,
//       errors:err.res.data.errors
//     })

//   }
// } )
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ categoryObj, resetForm }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:3046/category/${categoryObj._id}`, 
        categoryObj
      );
      resetForm();
      return res.data;
    } catch (err) {
      return rejectWithValue({
        message: err.message,
        errors: err.response?.data?.errors || [],
      });
    }
  }
);


export const removeCategory = createAsyncThunk("categories/removeCategory", async (id) =>{
  try{
    console.log(id)
    const res = await axios.delete(`http://localhost:3046/category/${id}`);
    console.log(res.data)
    return res.data
  }catch(err){
    console.log(err)
  }

})
const CategorySlice = createSlice({
  name: "categories",
  initialState: { data: [], loading: false, serverError: null,editId:null },

  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    // console.log(state.data);
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.serverError = action.payload;
    });
    builder.addCase(addCategory.fulfilled,(state,action)=>{
      state.data.push(action.payload)
      state.serverError= null
      state.loading = false;

    })
    builder.addCase(addCategory.rejected,(state,action)=>{
      state.serverError=action.payload
    })
    builder.addCase(updateCategory.fulfilled,(state,action)=>{
      const index = state.data.findIndex(ele=>ele._id ===action.payload._id)
    
        state.data[index] = action.payload;
      
      state.editId=null;
      state.serverError= null;
    })
    builder.addCase(updateCategory.rejected,(state,action)=>{
      state.serverError = action.payload
    })
    builder.addCase(removeCategory.fulfilled,(state,action)=>{
      state.loading= false;
      const index = state.data.findIndex((ele)=>ele._id==action.payload._id)
      state.data.splice(index,1)
    })
  
  },
  reducers:{
    assignEditId:(state,action)=>{
      state.editId= action.payload;
    }
  }
});
export const  {assignEditId} = CategorySlice.actions 
export default CategorySlice.reducer; 