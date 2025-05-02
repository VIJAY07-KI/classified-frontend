import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { removeProduct,assigneditId,fetchProducts } from "./ProductSlice"
import { fetchAllUsers } from "./UserSlice"
export default function MyProducts(){
  const dispatch=useDispatch()
  useEffect(()=>{
      dispatch(fetchProducts())
      dispatch(fetchAllUsers())
    },[dispatch])
    // const [myproducts,setMyproducts]=useState([])
    const navigate=useNavigate()
    const {data,users}=useSelector((state)=>{
        return state.user
    })
    const {productData}=useSelector((state)=>{
        return state.products
    })
    const {categoryData}=useSelector((state)=>{
        return state.categories
    })
    const getCategoryName=(catId)=>{
        // console.log(catId)
        const catName=categoryData.find((ele)=>ele._id==catId)
        return catName?catName.name:'N/A'
        // console.log(catName.name)
    }
    const getSellerName=(sellerId)=>{
      console.log(sellerId)
      const sellerName=users.find((ele)=>ele._id==sellerId)
      console.log(sellerName)
      return sellerName?sellerName.name:'N/A'
    }
    const myproducts=productData.filter((ele)=>ele.seller==data._id)
    // setMyproducts(result)
    // console.log(myproducts)
    
    return(
        
        <div className="flex justify-center  mt-10 h-[90%]">
            {/* <h2>MyProducts comp</h2> */}
            <div className="w-[80%] overflow-x-auto h-[100%]">
               {productData && <h2 className="text-xl font-semibold mb-4">My Products List - {myproducts.length}</h2>}
               <button className="text-center border rounded-[8px] mt-5 bg-blue-500 cursor-pointer hover:bg-blue-900 text-white py-[4px] w-[8rem] mb-2" onClick={()=>{navigate('/productform')}}>Add Product</button>
               <button className="text-center border rounded-[8px] mt-5 bg-blue-500 cursor-pointer hover:bg-blue-900 text-white py-[4px] w-[8rem] mb-2 ml-[57rem]" onClick={()=>{navigate('/product')}}>Product List</button>     
               
               {(productData.length>0&&myproducts.length > 0 && categoryData) &&
                 <div className="rounded-lg overflow-hidden shadow-md border border-gray-300">
                   <table className="min-w-full border-collapse">
                     <thead>
                       <tr className="bg-gray-200">
                         <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                         {/* <th className="border border-gray-300 px-4 py-2 text-left">Images</th> */}
                         <th className="border border-gray-300 px-4 py-2 text-left">Images</th>
                         <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                         <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                         <th className="border border-gray-300 px-4 py-2 text-left">Seller</th>
                         <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                         <th className="border border-gray-300 px-4 py-2 text-left">Views</th>
                        {(data&&data.role=='seller')&& <th className="border border-gray-300 px-4 py-2 text-left ">Update</th>}
                        {(data&&data.role=='seller')&& <th className="border border-gray-300 px-4 py-2 text-left ">Delete</th>}
                        
                       </tr>
                     </thead>
                     <tbody>
                       {myproducts.map((ele) => (
                         <tr key={ele._id} className="hover:bg-gray-50">
                           <td className="border border-gray-300 px-4 py-2">{ele.name}</td>
                           {/* <td className="border border-gray-300 px-4 py-2">{ele.images}</td> */}
                           <td className="border border-gray-300 px-4 py-2"><div className="md:w-1/2 flex justify-center items-start">
                    <img
                        src={ele.images}
                        alt={ele.name}
                        className="w-full max-w-md h-auto object-contain border rounded"
                    />
                </div></td>
                           <td className="border border-gray-300 px-4 py-2">₹{ele.price}</td>
                           <td className="border border-gray-300 px-4 py-2">{ele.description}</td>
                           <td className="border border-gray-300 px-4 py-2">{getSellerName(ele.seller)}</td>
                           <td className="border border-gray-300 px-4 py-2">{getCategoryName(ele.category)}</td>
                           <td className="border border-gray-300 px-4 py-2">{ele.views}</td>
                          {(data&&data.role=='admin')?( <td className="border border-gray-300 px-4 py-2"><button className="text-sm border rounded-md bg-green-500 hover:bg-green-700 text-white py-1 px-3">Approve</button></td>):(<>{(data&&data.role=='seller')&& <td className="border border-gray-300 px-4 py-2 space-x-2 ">
                             <button
                               className="text-sm border rounded-md bg-green-500 hover:bg-green-700 text-white py-1 px-3"
                               onClick={() =>{ dispatch(assigneditId(ele._id) )
                                navigate('/productform')}}
                             >
                               Edit
                             </button></td>}</>)} 
                            
                             {(data&&data.role=='admin')?( <td className="border border-gray-300 px-4 py-2"><button className="text-sm border rounded-md bg-red-500 hover:bg-red-700 text-white py-1 px-3">Reject</button></td>):(<>{(data&&data.role=='seller')&& <td className="border border-gray-300 px-4 py-2 space-x-2 ">
                             <button
                               className="text-sm border rounded-md bg-red-500 hover:bg-red-700 text-white py-1 px-3"
                               onClick={() => dispatch(removeProduct(ele._id))}
                             >
                               Remove
                             </button>
                            
                           </td>}</>)}
                             
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               }
             </div>
             
        </div>
    )
}