import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses from the json-server
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/expenses");
        setExpenses(response.data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };
    fetchExpenses();
  }, []);

  // Add a new expense and send it to json-server
  const addExpense = async (newExpense) => {
    try {
      const response = await axios.post("http://localhost:5000/expenses", newExpense);
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  // Delete an expense from the json-server
  const deleteExpense = async (id) => {
    console.log("Trying to delete expense with ID:", id); // Add this to log the id
    try {
      const response = await axios.delete(`http://localhost:5000/expenses/${id}`);
      console.log("Delete response:", response); // Check if the response is correct
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };
  

  // Update an expense in the json-server
  const updateExpense = async (updatedExpense) => {
    try {
      await axios.put(`http://localhost:5000/expenses/${updatedExpense.id}`, updatedExpense);
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        )
      );
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, updateExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
