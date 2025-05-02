import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchProducts } from "./ProductSlice"
import { fetchCategories } from "./CategorySlice"
import ProductList from "./ProductList"
import { useNavigate } from "react-router-dom"

export default function Product() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6 space-y-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-semibold text-blue-600">Products</h2>
                    {/* {(data && data.role === 'seller') && (
                        <button
                            onClick={() => navigate('/product')}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            Add Product
                        </button>
                    )} */}
                </div>

  <button 
    onClick={() => navigate("/myproducts")} 
    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-xl shadow-md transition duration-300 ease-in-out ml-[50rem]"
  >
    My Products
  </button>




                <ProductList />

                {/* <div className="pt-10 border-t">
                    <ProductForm />
                </div> */}
            </div>
        </div>
    )
}
