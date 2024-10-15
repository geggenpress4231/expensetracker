import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense, fetchExpenses } from "../../actions/expenseActions";
import moment from 'moment';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { message } from 'antd'; 
import './ExpenseList.css';

export default function ExpenseList({ onEditExpense, searchParams, selectedDateRange, selectedCategories }) {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const isInitialLoad = useSelector((state) => state.expenses.isInitialLoad);  // Optional: if you are tracking if this is the first load

  useEffect(() => {
    dispatch(fetchExpenses())
      .catch((error) => console.error('Error fetching expenses:', error));
  }, [dispatch]);

  // Handle delete action with toast including expense description
  const handleDelete = async (id, description) => {
    try {
      await dispatch(deleteExpense(id));
      message.success(`Expense "${description}" deleted successfully!`);  // Show success toast with description
    } catch (error) {
      console.error('Error deleting expense:', error);
      message.error('Failed to delete the expense.'); // Show error toast if deletion fails
    }
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

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesDescription = searchParams.description
        ? expense.description.toLowerCase().includes(searchParams.description.toLowerCase())
        : true;

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes("All")
        ? true
        : selectedCategories.some((category) => category.toLowerCase() === expense.category.toLowerCase());

      const matchesAmount = searchParams.amount
        ? expense.amount === parseFloat(searchParams.amount)
        : true;

      const matchesDate = matchesDateRange(expense.date);

      return matchesDescription && matchesCategory && matchesAmount && matchesDate;
    });
  }, [expenses, searchParams, selectedCategories, selectedDateRange]);

  const sortedExpenses = useMemo(() => {
    return [...filteredExpenses].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [filteredExpenses]);

  // Case 1: No expenses at all, show welcome message
  if (expenses.length === 0) {
    return (
      <section className="expense-list-container">
        <div className="welcome-message-container">
          <p className="welcome-description">
            Start managing your expenses efficiently and effortlessly.
          </p>
          <p className="instruction-text">
            To get started, click the "Add Expense" button.
          </p>
        </div>
      </section>
    );
  }

  // Case 2: Expenses exist but no filtered results match the filters
  if (expenses.length > 0 && filteredExpenses.length === 0) {
    return (
      <section className="expense-list-container">
        <p className="no-expenses-message">
          No expenses match the selected filters. Please adjust your filters and try again.
        </p>
      </section>
    );
  }

  // Case 3: Display filtered or all expenses
  return (
    <section className="expense-list-container">
      <table className="expense-list-table" aria-label="Expense List">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Options</th>
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
                <button aria-label="Edit expense" onClick={() => onEditExpense(expense)}>
                  <FaEdit className="edit-icon" />
                </button>
                <button aria-label="Delete expense" onClick={() => handleDelete(expense.id, expense.description)}>
                  <FaTrashAlt className="delete-icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
