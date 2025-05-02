import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./Axios"
export const fetchUserAccount=createAsyncThunk('user/fetchUserAccount',async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get('/account',{headers:{Authorization:localStorage.getItem('token')}})
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue({
            message:'Something went wrong'
        })
    }
})
export const removeUser=createAsyncThunk('user/removeUser',async(id,{rejectWithValue})=>{
    try{
        const response=await axios.delete(`account/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue({
            message:'Something went wrong'
        })
    }
})
export const fetchAllUsers= createAsyncThunk("user/fetchAllUsers",async(_,{rejectWithValue})=>{
    try{
        const res= await axios.get("/users",{headers:{Authorization:localStorage.getItem('token')}})
        return res.data

    }catch(err){
        console.log(err)
        return rejectWithValue({
            message:'Something went wrong'
        })


    }

})

export const activateUsers= createAsyncThunk("user/activateUsers",async(id,{rejectWithValue})=>{
    try{
        const res= await axios.put(`/activation/${id}`,{isActive:true},{headers:{Authorization:localStorage.getItem('token')}})
        console.log(res.data)
        return res.data

    }catch(err){
        console.log(err)
        return rejectWithValue({
            message:err.message,
                  errors:err.code
        })
      }

})
export const deActivateUsers= createAsyncThunk("user/deActivateUsers",async(id,{rejectWithValue})=>{
    try{
        const res= await axios.put(`/activation/${id}`,{isActive:false},{headers:{Authorization:localStorage.getItem('token')}})
        console.log(res.data)
        return res.data

    }catch(err){
        console.log(err)
        return rejectWithValue({
            message:err.message,
                  errors:err.code
        })


    }

})



const UserSlice=createSlice({
    name:'user',
    initialState:{
        data:null,isLoggedIn:false,serverErr:null,users:[],editId:null
    },
    reducers:{
        login:(state,action)=>{
            state.data=action.payload
            state.isLoggedIn=true
        },
        logout:(state,action)=>{
            state.data=null
            state.isLoggedIn=false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUserAccount.fulfilled,(state,action)=>{
            state.data=action.payload
            state.isLoggedIn=true
        })
        builder.addCase(fetchUserAccount.rejected,(state,action)=>{
            state.serverErr=action.payload
            
        })
        builder.addCase(fetchAllUsers.fulfilled,(state,action)=>{
            state.users=action.payload
            
        })
        builder.addCase(fetchAllUsers.rejected,(state,action)=>{
            state.serverErr=action.payload
            
        })
         builder.addCase(activateUsers.fulfilled,(state,action)=>{
                  const index=state.users.findIndex((ele)=>ele._id===action.payload._id)
                  state.users[index]=action.payload
                  state.serverErr=null
          
                  state.loading=false
              }) 
              builder.addCase(activateUsers.rejected,(state,action)=>{
                state.serverErr=action.payload
            })   
             
            builder.addCase(deActivateUsers.fulfilled,(state,action)=>{
              const index=state.users.findIndex((ele)=>ele._id===action.payload._id)
              state.users[index]=action.payload
              state.serverErr=null
        
              state.loading=false
          }) 
          builder.addCase(deActivateUsers.rejected,(state,action)=>{
            state.serverErr=action.payload
        }) 

        builder.addCase(removeUser.fulfilled,(state,action)=>{
            const index=state.users.findIndex((ele)=>ele._id==action.payload._id)
            state.users.splice(index,1)
            state.isLoggedIn=true
        })
        builder.addCase(removeUser.rejected,(state,action)=>{
            state.serverErr=action.payload
            
        })
        
        
    }
})
export const {login,logout}=UserSlice.actions
export default UserSlice.reducer