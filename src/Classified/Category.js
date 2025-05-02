import { useDispatch, useSelector } from "react-redux"
import { fetchCategories, removeCategory, assignEditId } from "./CategorySlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Category() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { categoryData, loading, serverError } = useSelector((state) => state.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  if (loading) return <p className="text-center mt-6 text-gray-600">Loading...</p>

  return (
    <div className="bg-sky-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Total Categories - {categoryData.length}
        </h2>
        <div>
  <button
    onClick={() => navigate("/categoryform")}
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ml-[35rem] mb-4"
  >
    Add Category
  </button>
</div>


        {categoryData.length > 0 && (
          <ul className="space-y-3 mb-6">
            {categoryData.map((ele) => (
              <li
                key={ele._id}
                className="flex items-center justify-between bg-sky-50 px-4 py-2 rounded shadow-sm"
              >
                <span className="text-gray-800 font-medium">{ele.name}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => {dispatch(assignEditId(ele._id))
                      navigate("/categoryform")
                      
                    }}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      const userConfirm = window.confirm("Are you sure?")
                      if (userConfirm) {
                        dispatch(removeCategory(ele._id))
                      }
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* <CategoryForm /> */}
      </div>
    </div>
  )
}
