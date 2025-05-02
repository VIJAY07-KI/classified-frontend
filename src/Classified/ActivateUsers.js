import { useState,useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { fetchAllUsers,activateUsers,deActivateUsers,removeUser } from "./UserSlice"
export default function ActivateUsers(){
    const [activate,setActivate]=useState(true)
    const dispatch=useDispatch()
    const {users}=useSelector((state)=>{
        return state.user
    })
    useEffect(()=>{
        dispatch(fetchAllUsers())
    },[dispatch])
    
    const activeUsers=users.filter((ele)=>ele.isActive==true)
    const requestedUser=users.filter((ele)=>ele.isActive==false)
    return(
        <div className="flex justify-center items-center h-screen">
            <div>
                <button className="text-sm border rounded-md bg-green-500 hover:bg-cyan-700 text-white py-1 px-3" onClick={()=>{setActivate(true)}}>Active Users</button>
                <button className="text-sm border rounded-md bg-orange-500 hover:bg-cyan-700 text-white py-1 px-3" onClick={()=>{setActivate(false)}}>Requested Users</button>
            {activate&&<div>
            <h2 className="text-xl font-semibold mb-4">Activate Users</h2>
            <table className="min-w-full border-collapse">
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">role</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Reject</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Delete</th>
                </tr>
                {activeUsers.map((ele)=><tr>
                    <td className="border border-gray-300 px-4 py-2">{ele.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{ele.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{ele.role}</td>
                    <td className="border border-gray-300 px-4 py-2">{ele.isActive?'Active':'InActive'}</td>
                    <td className="border border-gray-300 px-4 py-2"><button className="text-sm border rounded-md bg-orange-500 hover:bg-orange-700 text-white py-1 px-3" onClick={()=>{dispatch(deActivateUsers(ele._id))}}>InActivate</button></td>
                    <td className="border border-gray-300 px-4 py-2"><button className="text-sm border rounded-md bg-red-500 hover:bg-red-700 text-white py-1 px-3" onClick={()=>{dispatch(removeUser(ele._id))}}>Delete</button></td>
                </tr>)}
            </table>
            </div>}
            

           {!activate&&<div>
            <h2 className="text-xl font-semibold mb-4">Requested Users</h2>
            
            <table className="min-w-full border-collapse">
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">role</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Activation</th>
                </tr>
                {requestedUser.map((ele)=><tr>
                    <td className="border border-gray-300 px-4 py-2">{ele.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{ele.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{ele.role}</td>
                    <td className="border border-gray-300 px-4 py-2">{ele.isActive?'Active':'InActive'}</td>
                    <td className="border border-gray-300 px-4 py-2"><button className="text-sm border rounded-md bg-green-500 hover:bg-green-700 text-white py-1 px-3" onClick={()=>{dispatch(activateUsers(ele._id))}}>Active</button></td>
                </tr>)}
            </table>
            </div>} 
            </div> 
        </div>
    )
}