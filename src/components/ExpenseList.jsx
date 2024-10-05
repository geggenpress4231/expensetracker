// components/ExpenseList.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense, fetchExpenses } from "../actions/expenseActions";  

export default function ExpenseList({ onEditExpense }) {
  const dispatch = useDispatch();
  
  // Get expenses from Redux store
  const expenses = useSelector((state) => state.expenses.expenses);

  // Get search parameters from Redux store
  const searchParams = useSelector((state) => state.search);

  // Fetch expenses when the component loads
  useEffect(() => {
    dispatch(fetchExpenses());  
  }, [dispatch]);

  // Handle delete action
  const handleDelete = (id) => {
    dispatch(deleteExpense(id));  
  };

  // Filter expenses based on searchParams
  const filteredExpenses = expenses.filter((expense) => {
    const matchesDescription = searchParams.description
      ? expense.description.toLowerCase().includes(searchParams.description.toLowerCase())
      : true;

    const matchesCategory = searchParams.category
      ? expense.category.toLowerCase().includes(searchParams.category.toLowerCase())
      : true;

    const matchesAmount = searchParams.amount
      ? expense.amount === parseFloat(searchParams.amount)
      : true;

    const matchesDate = searchParams.date
      ? expense.date === searchParams.date
      : true;

    return matchesDescription && matchesCategory && matchesAmount && matchesDate;
  });

  // Sort expenses by date (most recent first)
  const sortedExpenses = [...filteredExpenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      {sortedExpenses.length === 0 ? (
        <p>No expenses recorded.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td>
                  <button onClick={() => onEditExpense(expense)}>Edit</button>
                  <button onClick={() => handleDelete(expense.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
