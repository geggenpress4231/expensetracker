import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense, fetchExpenses } from "../actions/expenseActions";  // Import fetchExpenses action

export default function ExpenseList({ onEditExpense }) {
  const dispatch = useDispatch();

  // Access expenses state from Redux
  const expenses = useSelector((state) => state.expenses.expenses);

  // Fetch expenses from JSON server when component loads
  useEffect(() => {
    dispatch(fetchExpenses());  // Dispatch fetchExpenses to load data from the server
  }, [dispatch]);

  // Handle delete action
  const handleDelete = (id) => {
    dispatch(deleteExpense(id));  // Dispatch the deleteExpense action
  };

  return (
    <div>
      {expenses.length === 0 ? (
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
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td>
                  <button onClick={() => onEditExpense(expense)}>Edit</button>
                  <button onClick={() => handleDelete(expense.id)}>Delete</button> {/* Handle delete */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
