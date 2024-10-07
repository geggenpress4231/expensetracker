import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense, fetchExpenses } from "../../actions/expenseActions";
import moment from 'moment';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';  // Importing FontAwesome icons
import './ExpenseList.css';

export default function ExpenseList({ onEditExpense, searchParams, selectedDateRange, selectedCategories }) {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);

  useEffect(() => {
    dispatch(fetchExpenses())
      .catch((error) => console.error('Error fetching expenses:', error));
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteExpense(id));
    } catch (error) {
      console.error('Error deleting expense:', error);
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

      // Ensure categories are matched case-insensitively and handle 'All'
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

  return (
    <section className="expense-list-container">
      {sortedExpenses.length === 0 ? (
        <p className="no-expenses-message">No expenses found for the selected filters.</p>
      ) : (
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
                  <button aria-label="Delete expense" onClick={() => handleDelete(expense.id)}>
                    <FaTrashAlt className="delete-icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
