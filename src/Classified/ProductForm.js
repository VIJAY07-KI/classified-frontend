import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createProduct, updateProduct } from "./ProductSlice"
import { useNavigate } from "react-router-dom"

export default function ProductForm() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [clientErrors, setClientErrors] = useState({})
    const { categoryData } = useSelector(state => state.categories)
    const { editId, productData } = useSelector(state => state.products)
    const dispatch = useDispatch()
    const navigate= useNavigate()

    useEffect(() => {
        if (editId) {
            const existProduct = productData.find(ele => ele._id === editId)
            console.log(existProduct)
            setName(existProduct.name)
            setPrice(existProduct.price)
            setImage(existProduct.images)
            setDescription(existProduct.description)
            setCategory(existProduct.category)
        }
    }, [dispatch,editId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = {}
        const resetForm = () => {
            setName('')
            setPrice('')
            setImage('')
            setDescription('')
            setCategory('')
        }

        if (name.trim().length === 0 || name.trim().length < 3) {
            errors.name = 'Name is required and should be at least 3 characters'
        }
        if (String(price).trim().length === 0) {
            errors.price = 'Price is required'
        }
        if (description.trim().length === 0 || description.trim().length < 3) {
            errors.description = 'Description is required and should be at least 3 characters'
        }
        if (category.trim().length === 0) {
            errors.category = 'Category is required'
        }

        if (Object.keys(errors).length > 0) {
            setClientErrors(errors)
        } else {
            if (editId) {
                const existProduct = productData.find(ele => ele._id === editId)
                const productObj = { ...existProduct, name, description, images: image, price, category }
                dispatch(updateProduct({ productObj, resetForm }))
                navigate("/myproducts")

            } else {
                const formData = { name, price, description, images: image, category }
                dispatch(createProduct({ formData, resetForm }))
                navigate("/myproducts")
            }
            setClientErrors({})
        }
    }

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    {editId ? 'Edit Product' : 'Add Product'}
                </h3>

                {categoryData && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block font-medium text-gray-600">Product Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Enter name"
                                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            />
                            {clientErrors.name && <p className="text-red-500 text-sm mt-1">{clientErrors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="price" className="block font-medium text-gray-600">Price:</label>
                            <input
                                type="text"
                                id="price"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                placeholder="Enter price"
                                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            />
                            {clientErrors.price && <p className="text-red-500 text-sm mt-1">{clientErrors.price}</p>}
                        </div>

                        <div>
                            <label htmlFor="image" className="block font-medium text-gray-600">Image URL:</label>
                            <input
                                type="text"
                                id="image"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                                placeholder="Enter image URL"
                                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block font-medium text-gray-600">Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Enter description"
                                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            />
                            {clientErrors.description && <p className="text-red-500 text-sm mt-1">{clientErrors.description}</p>}
                        </div>

                        <div>
                            <label htmlFor="category" className="block font-medium text-gray-600">Category:</label>
                            <select
                                id="category"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="">Select Category</option>
                                {categoryData.map((ele) => (
                                    <option key={ele._id} value={ele._id}>{ele.name}</option>
                                ))}
                            </select>
                            {clientErrors.category && <p className="text-red-500 text-sm mt-1">{clientErrors.category}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                {editId ? 'Update Product' : 'Add Product'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
