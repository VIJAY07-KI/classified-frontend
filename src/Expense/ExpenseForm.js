import { useState } from "react";
import { AddExpense } from "./ExpenseSlice";
import { useSelector, useDispatch } from "react-redux";

export default function ExpenseForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const categories = useSelector((state) => state.categories?.data || []);
  const dispatch = useDispatch();

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setExpenseDate("");
    setCategory("");
    setDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      amount: Number(amount), // Ensure amount is a number
      category,
      expenseDate,
      description,
    };
    dispatch(AddExpense(formData));
    resetForm();
  };

  return (
    <div>
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
        <br />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
        />
        <br />
        <input
          type="date"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
          placeholder="Select date"
        />
        <br />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select</option>
          {Array.isArray(categories) &&
            categories.map((ele) => (
              <option key={ele._id} value={ele._id}>
                {ele.name}
              </option>
            ))}
        </select>
        <br />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}






// import {useState} from 'react'
// import { AddExpense } from './ExpenseSlice'
// import { useSelector,useDispatch } from 'react-redux'
// export default function ExpenseForm(){
//     const [title,setTitle]=useState('')
//     const [amount,setAmount]=useState('')
//     const [expenseDate,setExpenseDate]=useState('')
//     const [category,setCategory]=useState('')
//     const [description,setDescription]=useState('')
//     const {data}=useSelector((state)=>{
//         return state.categories
//     })
//     const dispatch=useDispatch()
//     const handleSubmit=(e)=>{
//         e.preventDefault()
//         const formData={
//             title:title,amount:amount,category:category,expenseDate:expenseDate,description:description
//         }
//         // console.log(formData)
//         const resetForm=()=>{
//             setAmount('')
//             setCategory('')
//             setDescription('')
//             setExpenseDate('')
//             setTitle('')
//         }
//         dispatch(AddExpense({formData,resetForm}))
//     }
//     return(
//         <div >
//             <h3>Add Expense</h3>
//             <form onSubmit={handleSubmit}>
//             <input type='text' value={title} onChange={e=>setTitle(e.target.value)} placeholder='Enter title' /> <br />
//             <input type='number' value={amount} onChange={e=>setAmount(e.target.value)} placeholder='Enter Amount' /><br />
//             <input type='date' value={expenseDate} onChange={e=>setExpenseDate(e.target.value)} placeholder='select date' /><br />
//             <select value={category} onChange={e=>setCategory(e.target.value)}>
//                 <option value=''>select</option>
//                 {data.map((ele)=><option value={ele._id}>{ele.name}</option>)}
//             </select> <br />
//             <input type='text' value={description} onChange={e=>setDescription(e.target.value)} placeholder='Enter description' /><br />
//             <button>submit</button>

//             </form>
//         </div>
//     )
// }