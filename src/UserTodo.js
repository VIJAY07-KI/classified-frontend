import "./App.css"
import axios from "axios"
import { useState,useEffect } from "react"

export default function UserTodo(){

    const [users,setusers] = useState([])
    const [selectedUser,setSelectedUser] = useState([])
    const [todos,setTodos] = useState([])
    const [posts,setPosts]=useState([])
    const [choice,setChoice] = useState('')

    useEffect(()=>{
        async function fetchuser(){
            try{
            const res = await axios.get("https://jsonplaceholder.typicode.com/users")
            setusers(res.data)
            }catch(err){
                console.log(err)
            }
         }
        fetchuser()
    },[])

    // useEffect(()=>{
    //     async function fetchDetails(){
    //         if(selectedUser ||choice)
    //             try{
    //                 const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${selectedUser}/todos`)
    //                 setTodos(res.data)
                
    //         }catch(err){
    //             console.log(err)
    //         }else{
    //             try{
    //                 const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${selectedUser}/posts`)
    //                 setPosts(res.data)
                
    //         }catch(err){
    //             console.log(err)

    //         }

    //         }}
    //     fetchDetails()
    // },[selectedUser,choice])
    // useEffect(()=>{
    //     async function fetchTodo(){ 
    //         if(selectedUser){
    //         try{
    //             const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${selectedUser}/todos`)
    //         setTodos(res.data)

    //         }catch(err){
    //         console.log(err)
    //     }
    // }else{
    //     setTodos([])
    // }

    //     }
    //     fetchTodo()

    // },[selectedUser])
    return(
        <div>
            <h1>User Todos</h1>
            <h2>Users - {users.length}</h2>
            <select value={selectedUser} onChange={(e)=>setSelectedUser(e.target.value)}>
                <option value="">Select User</option>
            {users.map((ele)=>{
                return <option key={ele.id} value={ele.id} >{ele.name}</option>
            })}
            </select>
            <br/>
            {
                selectedUser && (
                    <><input type="radio" name="choice" checked= {choice == "posts"} onChange={(e)=>setChoice("posts")}/>posts
                    <input type="radio" name="choice" checked= {choice == "todos"} onChange={(e)=>setChoice("todos")}/>todos
                    
                    </>
                    
                )
            }
            {todos.length>0 &&(
                <div>
                    <h2>Total Todos - {todos.length}</h2>
            <ul>{todos.map((ele)=>{
                return <li key={ele.id}>{ele.title}</li>
            })}
            </ul>
            </div>
            )}
            {posts.length>0 &&(
                <div>
                    <h2>Total posts - {posts.length}</h2>
            <ul>{posts.map((ele)=>{
                return <li key={ele.id}>{ele.title}</li>
            })}
            </ul>
            </div>
            )}


        </div>
    )

}