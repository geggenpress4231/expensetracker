import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';  // Import useDispatch from Redux
import { addExpense, updateExpense } from '../actions/expenseActions';  // Import Redux actions
import { AutoComplete } from 'antd';  // Import Ant Design AutoComplete

export default function ExpenseForm({ onSubmit, expense }) {
  const dispatch = useDispatch();  // Initialize dispatch from Redux
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);  // Suggestions for autocomplete

  const LOCAL_STORAGE_KEY = 'expenseDescriptions';

  // Load saved descriptions from localStorage when the component loads
  useEffect(() => {
    const savedDescriptions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setSuggestions(savedDescriptions);
  }, []);

  // Pre-fill form with expense data if editing, or reset fields when adding a new expense
  useEffect(() => {
    if (expense) {
      setDescription(expense.description);
      setAmount(expense.amount);
      setDate(expense.date);
      setCategory(expense.category);
    } else {
      // If there's no existing expense (i.e., adding a new expense), reset the fields
      setDescription("");
      setAmount("");
      setDate("");
      setCategory("");
    }
  }, [expense]);  // This effect runs when 'expense' changes

  // Validate the form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!description) {
      newErrors.description = "Description is required";
    }
    
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = "Amount should be a positive number";
    }

    if (!date) {
      newErrors.date = "Date is required";
    }

    if (!category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
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

      const savedDescriptions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      if (!savedDescriptions.includes(description)) {
        savedDescriptions.push(description);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedDescriptions));  // Save updated descriptions to localStorage
      }

      if (expense) {
        dispatch(updateExpense(newExpense));
      } else {
        dispatch(addExpense(newExpense));
      }

      onSubmit();  // Close modal after adding/updating

      // Clear form fields after submit
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
        {/* AutoComplete with suggestions when input is empty */}
        <AutoComplete
          options={suggestions.map((desc) => ({ value: desc }))}  // Format suggestions for AutoComplete
          style={{ width: '100%' }}
          value={description}
          onChange={setDescription}
          placeholder="Enter description"
          allowClear
          filterOption={(inputValue, option) =>
            inputValue
              ? option.value.toLowerCase().startsWith(inputValue.toLowerCase())  // Show filtered suggestions based on input
              : true  // Show all suggestions if input is empty
          }
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
          min="0"
          step="0.01"  // Allow decimal values
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
