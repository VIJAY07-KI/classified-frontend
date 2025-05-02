
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Category/CategorySlice"
import { useEffect } from "react";
import CategoryForm from "./CategoryForm";
import { removeCategory,assignEditId } from "./CategorySlice";

export default function Category() {
  const dispatch = useDispatch();
  const { data, loading, serverError } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (serverError) return <p>Error: {serverError.message || serverError}</p>;
  if (!data || data.length === 0) return <p>No categories available</p>;

  return (
    <div>
      <h2>Total Categories - {data.length}</h2>
      <ul>
        {data.map((ele) => (
          <li key={ele.id}>{ele.name}<button onClick={()=>dispatch(assignEditId(ele._id))}>edit</button><button onClick={()=>{
            const userConfirm = window.confirm("Are You Sure")
            if(userConfirm){
              dispatch(removeCategory(ele._id))
            }
          }}>Remove</button></li> 

        ))}
      </ul>
      <CategoryForm/>
    </div>
  );
}
