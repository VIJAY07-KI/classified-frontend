import {useContext, useState} from "react";
import axios from "axios";
import CategoryContext from "./CategoryContext";

export default  function CategoryForm(){
    const {addCategory} = useContext(CategoryContext)
    const [name,setName]= useState("")
    const [clientErrors,setClientErrors] = useState("")
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const errors={}
        if(name.trim().length===0){
            errors.name = "name field is Required"
          }
          if(Object.keys(errors).length ===0){
        
          
        try{
           const response = await axios.post("http://localhost:3035/create-category",{name})
           addCategory(response.data)
           
           setName("")

        }
        catch(err){
            console.log(err)

        }
    }
    }

    return(
        <div><h2>add category</h2>
        <form onSubmit={handleSubmit}>
        <label>Enter the Category</label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        {clientErrors.name && (
          <span style={{ color: "red" }}>{clientErrors.name}</span>
        )}
        <input type="submit"/>
        </form>
        </div>
    )

}