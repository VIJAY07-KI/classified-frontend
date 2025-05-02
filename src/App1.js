import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import CategoryContainer from "./categoryContainer";
import ExpenseContainer from "./ExpenseContainer";
import CategoryContext from "./CategoryContext";

function App1() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get("http://localhost:3035/all-categories");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategories();
  }, []);

  // Fetch expenses on mount
  useEffect(() => {
    async function fetchExpenses() {
      try {
        const res = await axios.get("http://localhost:3035/all-expenses");
        setExpenses(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchExpenses();
  }, []);

  // Function to refetch categories
  const handleCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3035/all-categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to refetch expenses
  const handleExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:3035/all-expenses");
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Add a new category
  const addCategory = (obj) => {
    setCategories((prev) => [...prev, obj]);
  };

  return (
    <div>
      <h1>Expense App</h1>
      <button onClick={handleCategories}>Fetch Categories</button>
      <button onClick={handleExpenses}>Fetch Expenses</button>

      <CategoryContext.Provider value={{ categories, addCategory }}>
        <CategoryContainer />
      </CategoryContext.Provider>

      <ExpenseContainer expenses={expenses} />
    </div>
  );
}

export default App1;
