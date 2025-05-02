import {fetchProducts,assigneditId,removeProduct,viewProduct} from "./ProductSlice"
import { useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux"
import { Link,useNavigate} from 'react-router-dom'
import { fetchCategories} from "./CategorySlice"
// import { fetchAllUsers } from '../../slices/userSlice'
export default function ProductList(){
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(()=>{
    dispatch(fetchProducts())
    dispatch(fetchCategories())
    // dispatch(fetchAllUsers())
  },[dispatch])
    const {productData}=useSelector((state)=>{
        return state.products
    })
    
    const {categoryData}=useSelector((state)=>{
        return state.categories
    })
    const {data,users,isLoggedIn}=useSelector((state)=>{
      return state.user
    })
    
    console.log(categoryData)
    const getCategoryName=(catId)=>{
        // console.log(catId)
        const catName=categoryData.find((ele)=>ele._id==catId)
        return catName?catName.name:'N/A'
        // console.log(catName.name)
    }
    const getSellerName=(sellerId)=>{
      const sellerName=users.find((ele)=>ele._id==sellerId)
      return sellerName?sellerName.name:'N/A'
    }
    const productsList=productData.filter((ele)=>ele.isApproved==true)
    if (productData.length==0&&users.length==0) return false
    return(

<div className="flex justify-center mt-10 h-[90%]">
  <div className="w-[95%] overflow-x-auto ">
    {productData && <h2 className="text-xl font-semibold mb-4">Product List - {data&&data.role=='admin'?productData.length:productsList.length}</h2>}
    
    {(data&&data.role=='admin'?productData.length>0:productsList.length > 0 && categoryData) &&
      <div className="rounded-lg overflow-hidden shadow-md border border-gray-300">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
             {isLoggedIn&& <th className="border border-gray-300 px-4 py-2 text-left">Images</th>}
              <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Seller</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Views</th>
             {data&&data.role=='buyer'&&<th className="border border-gray-300 px-4 py-2 text-left">Enquiry</th>}
              {data&&data.role=='admin'&&<th className="border border-gray-300 px-4 py-2 text-left">Status</th>}
              <th className="border border-gray-300 px-4 py-2 text-left">Show</th>
             {/* {(data&&(data.role=='admin'))&& <th className="border border-gray-300 px-4 py-2 text-left ">IsApprove</th>}
             {(data&&(data.role=='admin'))&& <th className="border border-gray-300 px-4 py-2 text-left ">Reject</th>} */}
            </tr>
          </thead>
          <tbody>
            {(data&&data.role=='admin'?productData:productsList).map((ele) => (
              <tr key={ele._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{ele.name}</td>
                {/* <td className="border border-gray-300 px-4 py-2">{ele.images}</td> */}
               {isLoggedIn&& <td className="border border-gray-300 px-4 py-2"><div className="md:w-1/2 flex justify-center items-start">
                    <img
                        src={ele.images}
                        alt={ele.name}
                        className="w-full max-w-md h-auto object-contain border rounded"
                    />
                </div></td>}
                <td className="border border-gray-300 px-4 py-2">₹{ele.price}</td>
                <td className="border border-gray-300 px-4 py-2">{ele.description}</td>
                <td className="border border-gray-300 px-4 py-2">{getSellerName(ele.seller)}</td>
                <td className="border border-gray-300 px-4 py-2">{getCategoryName(ele.category)}</td>
                <td className="border border-gray-300 px-4 py-2">{ele.views}</td>
                {data&&data.role=='buyer'&&<td className="border border-gray-300 px-4 py-2"><Link to={`/enquiry/${ele._id}`}>AddEnquiry</Link></td>}
               {data&&data.role=='admin' &&<td className="border border-gray-300 px-4 py-2">{ele.isApproved?'Approved':'Requested'}</td>}
               <td className="border border-gray-300 px-4 py-2">
  <button 
    onClick={() => navigate(`/showproduct/${ele._id}`)}
    className="bg-cyan-500 hover:bg-black-600 text-white text-sm font-medium px-3 py-1 rounded-md shadow-sm transition duration-200"
  >
    Show
  </button>
</td>

               {/* {(data&&data.role=='admin')?( <td className="border border-gray-300 px-4 py-2"><button className="text-sm border rounded-md bg-green-500 hover:bg-green-700 text-white py-1 px-3">Approve</button></td>):(<>{(data&&data.role=='seller')&& <td className="border border-gray-300 px-4 py-2 space-x-2 ">
                  <button
                    className="text-sm border rounded-md bg-green-500 hover:bg-green-700 text-white py-1 px-3"
                    onClick={() => dispatch(assigneditId(ele._id))}
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
                 
                </td>}</>)} */}
                  
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