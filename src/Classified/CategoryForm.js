import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, updateCategory } from "./CategorySlice";
import { useNavigate } from "react-router-dom";

export default function CategoryForm() {
    const [name, setName] = useState("");
    const [clientErrors, setClientErrors] = useState({});
    const { editId, categoryData } = useSelector((state) => state.categories);
    const dispatch = useDispatch();
    const navigate= useNavigate()

    useEffect(() => {
        if (editId) {
            const category = categoryData.find((ele) => ele._id === editId);
            if (category) {
                setName(category.name);
            }
        }
    }, [categoryData, editId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (name.trim().length === 0 || name.trim().length < 3) {
            errors.name = "Name is required and should be at least 3 characters";
        }

        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
        } else {
            const resetForm = () => {
                setName("");
                setClientErrors({});
            };

            if (editId) {
                const category = categoryData.find((ele) => ele._id === editId);
                const categoryObj = { ...category, name };
                dispatch(updateCategory({ categoryObj, resetForm }));
                navigate("/category")

            } else {
                const formData = { name };
                dispatch(addCategory({ formData, resetForm }));
                navigate("/category")
            }
        }
    };

    return (
        <div className="flex justify-center mt-8">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    {editId ? "Edit Category" : "Add Category"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-600 mb-1"
                        >
                            Category Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter category name"
                            className={`w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                                clientErrors.name
                                    ? "border-red-500 focus:ring-red-400"
                                    : "focus:ring-blue-500"
                            }`}
                        />
                        {clientErrors.name && (
                            <p className="text-red-500 text-sm mt-1">{clientErrors.name}</p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            {editId ? "Update" : "Add"} Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
