import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./Axios"
export const fetchProducts=createAsyncThunk('products/fetchProducts',async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get('/products')
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        rejectWithValue({
            message:err.message,
            errors:err.response.data.error
        })
    }
})

 export const createProduct=createAsyncThunk('products/createProduct',async({formData,resetForm},{rejectWithValue})=>{
      try{
        const response=await axios.post('/product',formData,{headers:{Authorization:localStorage.getItem('token')}})
        console.log(response.data)
        resetForm()
        return response.data
      }catch(err){
        console.log(err)
        return rejectWithValue({
          message:err.message,                      
        })
      }
    })
     export const updateProduct=createAsyncThunk('products/updateProduct',async({productObj,resetForm},{rejectWithValue})=>{
          try{
            console.log()
            const response=await axios.put(`/product/${productObj._id}`,productObj,{headers:{Authorization:localStorage.getItem('token')}})
            resetForm()
            console.log(response.data)
            return response.data
          }catch(err){
            console.log(err)
            return  rejectWithValue({
              message:err.message,
              errors:err.response.data.errors
            })
          }
        })

         export const removeProduct=createAsyncThunk('products/removeProduct',async(id,{rejectWithValue})=>{
              console.log(id)
              try{
                const response=await axios.delete(`/product/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
                console.log(response.data)
                return response.data
              }catch(err){
                console.log(err)
                return rejectWithValue({
                  message:err.message,
                  errors:err.code
                })
              }
            })
            export const approveProduct = createAsyncThunk("products/approveProduct",async(id,{rejectWithValue})=>{
              try{
                const response=await axios.put(`/productapprove/${id}`,{isApproved:true},{headers:{Authorization:localStorage.getItem('token')}})
                console.log(response.data)
                return response.data
              }catch(err){
                console.log(err)
                return rejectWithValue({
                  message:err.message,
                  errors:err.code
                })
              }

            } )

            export const rejectProduct = createAsyncThunk("products/rejectProduct",async(id,{rejectWithValue})=>{
              try{
                const response=await axios.put(`/productapprove/${id}`,{isApproved:false},{headers:{Authorization:localStorage.getItem('token')}})
                console.log(response.data)
                return response.data
              }catch(err){
                console.log(err)
                return rejectWithValue({
                  message:err.message,
                  errors:err.code
                })
              }

            } )

            export const addEnquires=createAsyncThunk('products/addEnquires',async({id,message},{rejectWithValue})=>{
              try{
                console.log(message)
                const response=await axios.post(`addenquiry/${id}`,{message:message},{headers:{Authorization:localStorage.getItem('token')}})
                // resetForm()
                console.log(response.data)
                return response.data
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
            })  
            
            export const respondEnquires=createAsyncThunk('products/respondEnquires',async({id,formData},{rejectWithValue})=>{
              try{
                // console.log(message)
                const response=await axios.post(`response/enquiry/${id}`,formData,{headers:{Authorization:localStorage.getItem('token')}})
                // resetForm()
                console.log(response.data)
                return response.data
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
            })    
            export const viewproduct=createAsyncThunk('products/viewproduct',async(id,{rejectWithValue})=>{
              try{
                // console.log(message)
                const response=await axios.put(`views/${id}`)
                // resetForm()
                console.log(response.data)
                return response.data
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
            }) 
            
            export const productDetails=createAsyncThunk('products/productDetails',async(id,{rejectWithValue})=>{
              try{
                // console.log(message)
                const response=await axios.get(`product/${id}`)
                // resetForm()
                console.log(response.data)
                return response.data
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
            })  


            export const removeEnquiry=createAsyncThunk('products/removeEnquiry',async({productId,enquiryId},{rejectWithValue})=>{
              try{
                console.log(productId,enquiryId)
                const response=await axios.delete(`remove/enquiry/${productId}/${enquiryId}`,{headers:{Authorization:localStorage.getItem('token')}})
                // resetForm()
                console.log(response.data)
                alert('Enquiry delete successfuly')
                return response.data
                
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
            })   
            
            
            export const markAsInterested=createAsyncThunk('products/markAsInterested',async(id,{rejectWithValue})=>{
              try{
                // console.log(id)
                const response=await axios.post(`markinterested/${id}`,{},{headers:{Authorization:localStorage.getItem('token')}})
                // resetForm()
                console.log(response.data)
                // alert('Enquiry delete successfuly')
                return response.data
                
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
            })    


            export const removeInterested=createAsyncThunk('products/removeInterested',async(id,{rejectWithValue})=>{
              try{
                // console.log(productId,enquiryId)
                const response=await axios.delete(`mark/uninterested/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
                // resetForm()
                console.log(response.data)
                // alert('Enquiry delete successfuly')
                return response.data
                
              }catch(err){
                console.log(err)
                return  rejectWithValue({
                  message:err.message,
                  errors:err.response.data.errors
                })
              }
            })    

const ProductSlice=createSlice({
    name:'products',
    initialState:{productData:[],loading:false,serverErr:null,editId:null},
    reducers:{
        assigneditId:(state,action)=>{
            console.log(action.payload)
              state.editId=action.payload
            }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.productData=action.payload
            state.loading=false
            state.serverErr=null
        })

        builder.addCase(fetchProducts.pending,(state,action)=>{
            // state.serverErr=action.payload
            state.loading=true
            state.serverErr=null
        })
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.serverErr=action.payload
            state.loading=false
        })

        builder.addCase(createProduct.fulfilled,(state,action)=>{
            // state.productData=state.productData.push(action.payload)
            state.productData.push(action.payload);
            state.loading=false
        })

        builder.addCase(createProduct.rejected,(state,action)=>{
            state.serverErr=action.payload
            state.loading=false
        })
        builder.addCase(updateProduct.fulfilled,(state,action)=>{
            const index=state.productData.findIndex((ele)=>ele._id===action.payload._id)
            state.productData[index]=action.payload
            state.editId=null
            state.serverErr=null
    
            state.loading=false
        })
        builder.addCase(updateProduct.rejected,(state,action)=>{
              state.serverErr=action.payload
        })

        builder.addCase(removeProduct.fulfilled,(state,action)=>{
            const index=state.productData.findIndex((ele)=>ele._id===action.payload)
            state.productData.splice(index,1)
        })

        builder.addCase(removeProduct.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(removeProduct.rejected,(state,action)=>{
            state.serverErr=action.payload
        })   
        
        builder.addCase(approveProduct.fulfilled,(state,action)=>{
          const index=state.productData.findIndex((ele)=>ele._id===action.payload._id)
          state.productData[index]=action.payload
          state.serverErr=null
  
          state.loading=false
      }) 
      builder.addCase(approveProduct.rejected,(state,action)=>{
        state.serverErr=action.payload
    })   
     
    builder.addCase(rejectProduct.fulfilled,(state,action)=>{
      const index=state.productData.findIndex((ele)=>ele._id===action.payload._id)
      state.productData[index]=action.payload
      state.serverErr=null

      state.loading=false
  }) 
  builder.addCase(rejectProduct.rejected,(state,action)=>{
    state.serverErr=action.payload
}) 
 //addEquiry
 builder.addCase(addEnquires.fulfilled,(state,action)=>{
  const index=state.productData.findIndex((ele)=>ele._id==action.payload._id)
  state.productData[index]=action.payload
  state.serverErr=null
  // state.editId=null
  state.loading=false
})
builder.addCase(addEnquires.rejected,(state,action)=>{
    state.serverErr=action.payload
})

//responseEnquiry

builder.addCase(respondEnquires.fulfilled,(state,action)=>{
const index=state.productData.findIndex((ele)=>ele._id==action.payload._id)
state.productData[index]=action.payload
state.serverErr=null
// state.editId=null
state.loading=false
})
builder.addCase(respondEnquires.rejected,(state,action)=>{
  state.serverErr=action.payload
})
//viewsproducts
builder.addCase(viewproduct.fulfilled,(state,action)=>{
const index=state.productData.findIndex((ele)=>ele._id==action.payload._id)
state.productData[index]=action.payload
state.serverErr=null
// state.editId=null
state.loading=false
})
builder.addCase(viewproduct.rejected,(state,action)=>{
state.serverErr=action.payload
})

builder.addCase(productDetails.fulfilled,(state,action)=>{
// const index=state.productData.findIndex((ele)=>ele._id==action.payload._id)
state.product=action.payload
state.serverErr=null
// state.editId=null
state.loading=false
})
builder.addCase(productDetails.rejected,(state,action)=>{
state.serverErr=action.payload
})

//remove Enquiry
builder.addCase(removeEnquiry.fulfilled,(state,action)=>{
const index=state.productData.findIndex((ele)=>ele._id==action.payload._id)
state.productData[index]=action.payload
state.serverErr=null
// state.editId=null
state.loading=false
})
builder.addCase(removeEnquiry.rejected,(state,action)=>{
state.serverErr=action.payload
})


//markasinterested

builder.addCase(markAsInterested.fulfilled,(state,action)=>{
const index=state.productData.findIndex((ele)=>ele._id==action.payload._id)
state.productData[index]=action.payload
state.serverErr=null
// state.editId=null
state.loading=false
})
builder.addCase(markAsInterested.rejected,(state,action)=>{
state.serverErr=action.payload
})

//removeasInterested


builder.addCase(removeInterested.fulfilled,(state,action)=>{
const index=state.productData.findIndex((ele)=>ele._id==action.payload._id)
state.productData[index]=action.payload
state.serverErr=null
// state.editId=null
state.loading=false
})
builder.addCase(removeInterested.rejected,(state,action)=>{
state.serverErr=action.payload
})


    }
})
export const {assigneditId}=ProductSlice.actions
export default ProductSlice.reducer