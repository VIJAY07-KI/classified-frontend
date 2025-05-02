import { useEffect } from "react"
import { useParams,useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import { productDetails,viewproduct,markAsInterested,removeInterested } from "./ProductSlice"
export default function ShowProduct(){
    const {id}=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        dispatch(productDetails(id))
        dispatch(viewproduct(id)) // This will run only once
          
    },[dispatch,id])
    const {product}=useSelector((state)=>{
        return state.products
    })
    const {isLoggedIn,data}=useSelector((state)=>{
        return state.user
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
    console.log(product)
    if (!product) return <div className="text-center mt-10 text-gray-500">Loading...</div>;
    return(
    <div className="bg-gray-100 min-h-screen py-10">
       {!isLoggedIn&& <button className="bg-violet-500 hover:bg-violet-600 text-white font-semibold px-6 py-2 rounded mt-4 ml-30" onClick={()=>{navigate('/')}}>Back</button>}
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-8">
               {isLoggedIn && <div><button className="bg-violet-500 hover:bg-violet-600 text-white font-semibold px-6 py-2 rounded mt-4 ml-30" onClick={()=>{navigate('/products')}}>Back</button></div>}
                {/* Left: Product Image */}
                <div className="md:w-1/2 flex justify-center items-start">
                    <img 
                        src={product.images}
                        alt={product.name}
                        className="w-full max-w-md h-auto object-contain border rounded"
                    />
                </div>

                {/* Right: Product Details */}
                <div className="md:w-1/2 space-y-4">
                    <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>
                    <p className="text-2xl font-bold text-green-600">₹{product.price}</p>

                    <div>
                        <p className="text-sm text-gray-500 font-semibold uppercase">Description</p>
                        <p className="text-gray-700">{product.description}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 font-semibold uppercase">Category</p>
                        <p className="text-gray-700">{getCategoryName(product.category)}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 font-semibold uppercase">Views</p>
                        <p className="text-gray-700">{product.views}</p>
                    </div>

                  {isLoggedIn&& data.role=='buyer'&& <div className="pt-4 flex gap-4">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded" onClick={()=>{dispatch(markAsInterested(product._id)) 
                            navigate('/mycart')
                        }}>
                            Add to Cart
                        </button>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded">
                            Buy Now
                        </button>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded" onClick={()=>{navigate(`/enquiry/${product._id}`)}}>
                            Add Enquiry
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    )
}