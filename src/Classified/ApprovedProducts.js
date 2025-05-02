import  { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchAllUsers } from "./UserSlice"
import { fetchProducts } from './ProductSlice';
import { approveProduct,rejectProduct,removeProduct } from "./ProductSlice"
const ApproveProducts = () => {
    const dispatch=useDispatch()
    const [approve,setApprove]=useState(true)
    const {productData}=useSelector((state)=>{
        return state.products
    })
    console.log(productData)
    const {categoryData}=useSelector((state)=>{
        return state.categories
    })
    const {users,data}=useSelector((state)=>{
        return state.user
    })
   

    useEffect(() => {
        dispatch(fetchAllUsers())
        dispatch(fetchProducts())
    }, [dispatch]);
    // console.log(productData)
   const approvedProducts=productData.filter((ele)=>ele.isApproved==true)
   console.log(approvedProducts)
   const RequestedProducts=productData.filter((ele)=>ele.isApproved==false)
   console.log(RequestedProducts)

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

    return (
        <div className="flex justify-center mt-10 h-[100%]" >
        <div className="w-[80%] overflow-x-auto ">
        <button className="text-sm border rounded-md bg-green-500 hover:bg-blue-700 text-white py-1 px-3" onClick={()=>{setApprove(true)}}>Approved Products</button>
        <button className="text-sm border rounded-md bg-orange-500 hover:bg-blue-700 text-white py-1 px-3" onClick={()=>{setApprove(false)}}>Requested Products</button>
           {approve&& <div className="rounded-lg overflow-hidden shadow-md border border-gray-300">
            <h2 className="text-xl font-semibold mb-4">ApproveProduct</h2>
            <table className="min-w-full border-collapse">
                                 <thead>
                                   <tr className="bg-gray-200">
                                     <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                     <th className="border border-gray-300 px-4 py-2 text-left">Images</th>
                                     <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                                     <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                                     <th className="border border-gray-300 px-4 py-2 text-left">Seller</th>
                                     <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                                     <th className="border border-gray-300 px-4 py-2 text-left">Views</th>
                                     <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                    {(data&&data.role=='admin')&& <th className="border border-gray-300 px-4 py-2 text-left "  >Reject</th>}
                                    {(data&&data.role=='admin')&& <th className="border border-gray-300 px-4 py-2 text-left " >Delete</th>}
                                   </tr>
                                 </thead>
                                 <tbody>
                                   {approvedProducts.map((ele) => (
                                     <tr key={ele._id} className="hover:bg-gray-50">
                                       <td className="border border-gray-300 px-4 py-2">{ele.name}</td>
                                       {/* <td className="border border-gray-300 px-4 py-2">{ele.images}</td> */}
                                       <td className="py-3 px-4 border-b">
                                            <div className="flex justify-center items-center">
                                                <img
                                                    src={ele.images}
                                                    alt={ele.name}
                                                    className="w-28 h-28 object-cover border border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>
                                        </td>
                                       <td className="border border-gray-300 px-4 py-2">₹{ele.price}</td>
                                       <td className="border border-gray-300 px-4 py-2">{ele.description}</td>
                                       <td className="border border-gray-300 px-4 py-2">{getSellerName(ele.seller)}</td>
                                       <td className="border border-gray-300 px-4 py-2">{getCategoryName(ele.category)}</td>
                                       <td className="border border-gray-300 px-4 py-2">{ele.views}</td>
                                       <td className="border border-gray-300 px-4 py-2">{ele.isApproved?'Approved':'Pending'}</td>
                                      {(data&&data.role=='admin')&&( <td className="border border-gray-300 px-4 py-2"><button className="text-sm border rounded-md bg-orange-500 hover:bg-red-700 text-white py-1 px-3"  onClick={()=>{dispatch(rejectProduct(ele._id))}}>Reject</button></td>)}
                                        
                                         {(data&&data.role=='admin')&&( <td className="border border-gray-300 px-4 py-2"><button className="text-sm border rounded-md bg-red-500 hover:bg-red-700 text-white py-1 px-3" onClick={()=>{dispatch(removeProduct(ele._id))}}>remove</button></td>)}
                                         
                                         
                                     </tr>
                                   ))}
                                 </tbody>
                               </table>
                               </div>}
                               {!approve&&<div className="rounded-lg overflow-hidden shadow-md border border-gray-300">
            <h2 className="text-xl font-semibold mb-4">RequestedProduct</h2>
            <table className="min-w-full border-collapse">
                                 <thead>
                                   <tr className="bg-gray-200">
                                     <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                     <th className="border border-gray-300 px-4 py-2 text-left">Images</th>
                                     <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                                     <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                                     <th className="border border-gray-300 px-4 py-2 text-left">Seller</th>
                                     <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                                     <th className="border border-gray-300 px-4 py-2 text-left">Views</th>
                                     <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                    {(data&&data.role=='admin')&& <th className="border border-gray-300 px-4 py-2 text-left ">Approve</th>}
                                    
                                   </tr>
                                 </thead>
                                 <tbody>
                                   {RequestedProducts.map((ele) => (
                                     <tr key={ele._id} className="hover:bg-gray-50">
                                       <td className="border border-gray-300 px-4 py-2">{ele.name}</td>
                                       {/* <td className="border border-gray-300 px-4 py-2">{ele.images}</td> */}
                                       <td className="py-3 px-4 border-b">
                                            <div className="flex justify-center items-center">
                                                <img
                                                    src={ele.images}
                                                    alt={ele.name}
                                                    className="w-28 h-28 object-cover border border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>
                                        </td>
                                       <td className="border border-gray-300 px-4 py-2">₹{ele.price}</td>
                                       <td className="border border-gray-300 px-4 py-2">{ele.description}</td>
                                       <td className="border border-gray-300 px-4 py-2">{getSellerName(ele.seller)}</td>
                                       <td className="border border-gray-300 px-4 py-2">{getCategoryName(ele.category)}</td>
                                       <td className="border border-gray-300 px-4 py-2">{ele.views}</td>
                                       <td className="border border-gray-300 px-4 py-2">{ele.isApproved?'Approved':'Pending'}</td>
                                      {(data&&data.role=='admin')&&( <td className="border border-gray-300 px-4 py-2"><button className="text-sm border rounded-md bg-green-500 hover:bg-green-700 text-white py-1 px-3" onClick={()=>{dispatch(approveProduct(ele._id))}}>Approve</button></td>)}
                                        
                                         
                                         
                                         
                                     </tr>
                                   ))}
                                 </tbody>
                               </table>
                               </div>  }             
                
        </div>
        </div>
    );
};

export default ApproveProducts;