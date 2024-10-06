import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense, fetchExpenses } from "../../actions/expenseActions";
import moment from 'moment';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';  // Importing FontAwesome icons
import './ExpenseList.css'

export default function ExpenseList({ onEditExpense, searchParams, selectedDateRange, selectedCategory }) {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  const matchesDateRange = (expenseDate) => {
    if (!selectedDateRange || (selectedDateRange[0] === null && selectedDateRange[1] === null)) {
      return true;
    }

    const [startDate, endDate] = selectedDateRange;
    const expenseMoment = moment(expenseDate, "YYYY-MM-DD");

    if (startDate && endDate) {
      return expenseMoment.isBetween(moment(startDate), moment(endDate), 'days', '[]');
    }

    return true;
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesDescription = searchParams.description
      ? expense.description.toLowerCase().includes(searchParams.description.toLowerCase())
      : true;

    const matchesCategory = selectedCategory === "All" || !selectedCategory
      ? true
      : expense.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesAmount = searchParams.amount
      ? expense.amount === parseFloat(searchParams.amount)
      : true;

    const matchesDate = matchesDateRange(expense.date);

    return matchesDescription && matchesCategory && matchesAmount && matchesDate;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="expense-list-container">
      {sortedExpenses.length === 0 ? (
        <p className="no-expenses-message">No expenses found for the selected filters.</p>
      ) : (
        <table className="expense-list-table">
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
                <td>${expense.amount.toFixed(2)}</td>
                <td className="expense-options">
                  <FaEdit className="edit-icon" onClick={() => onEditExpense(expense)} />
                  <FaTrashAlt className="delete-icon" onClick={() => handleDelete(expense.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
