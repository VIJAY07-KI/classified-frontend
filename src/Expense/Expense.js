import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "./ExpenseSlice";
import { useEffect } from "react";
import ExpenseForm from "./ExpenseForm";

export default function Expense() {
  const dispatch = useDispatch();
  const { data, loading, serverError } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  // if (serverError) return <p>Error: {serverError.message || serverError}</p>;
  // if (serverError) return <p>Error: {String(serverError)}</p>;

 
  
  
  if (!data || data.length === 0) return <p>No expenses available</p>;

  return (
    <div>
      <h2>Total Expenses - {data.length}</h2>
      <ul>
        {data.map((ele) => (
          <li key={ele.id}>{ele.title}</li>
        ))}
      </ul>
      <ExpenseForm/>

    </div>
    
    
  );
}
