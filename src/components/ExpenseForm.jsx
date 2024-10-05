import React, { useState, useEffect, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ExpenseForm({ onSubmit, expense }) {
  const { addExpense, updateExpense } = useContext(ExpenseContext);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});

  // Pre-fill form with expense data if editing
  useEffect(() => {
    if (expense) {
      setDescription(expense.description);
      setAmount(expense.amount);
      setDate(expense.date);
      setCategory(expense.category);
    }
  }, [expense]);

  const validateForm = () => {
    const newErrors = {};
    if (!description) newErrors.description = "Description is required";
    if (!amount || amount <= 0) newErrors.amount = "Amount should be a positive number";
    if (!date) newErrors.date = "Date is required";
    if (!category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newExpense = {
        id: expense ? expense.id : Date.now(),
        description,
        amount: parseFloat(amount),
        date,
        category
      };

      if (expense) {
        // If editing an expense, update it
        updateExpense(newExpense);
      } else {
        // Otherwise, add a new expense
        addExpense(newExpense);
      }

      onSubmit();  // Close modal after adding/updating
      // Clear form fields
      setDescription("");
      setAmount("");
      setDate("");
      setCategory("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
        {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
      </div>
      
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}
      </div>

      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}
      </div>

      <div>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Health">Health</option>
            <option value="Groceries">Groceries</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
        </select>
        {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}
    </div>


      <button type="submit" style={{ marginTop: "20px" }}>Submit</button>
    </form>
  );
}
