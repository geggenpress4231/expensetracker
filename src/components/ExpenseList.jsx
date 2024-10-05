import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ExpenseList({ onEditExpense }) {
  const { expenses, deleteExpense } = useContext(ExpenseContext);

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
                  <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
