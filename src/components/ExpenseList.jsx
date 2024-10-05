import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense, fetchExpenses } from "../actions/expenseActions";
import DateFilter from "./DateFilter";
import CategoryFilter from "./CategoryFilter";
import moment from 'moment';

export default function ExpenseList({ onEditExpense }) {
  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expenses.expenses);
  const searchParams = useSelector((state) => state.search);

  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  // Date range comparison logic
  const matchesDateRange = (expenseDate) => {
    if (!selectedDateRange || (selectedDateRange[0] === null && selectedDateRange[1] === null)) {
      return true; // No date range selected
    }
    
    const [startDate, endDate] = selectedDateRange;
    const expenseMoment = moment(expenseDate, "YYYY-MM-DD");
    
    if (startDate && endDate) {
      return expenseMoment.isBetween(moment(startDate), moment(endDate), 'days', '[]');
    }
    
    return true;
  };

  // Filter expenses based on searchParams and selected category/date range
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

  const uniqueCategories = [...new Set(expenses.map(expense => expense.category))];

  const handleDateChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category || "All");
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>Date</span>
          <DateFilter onDateChange={handleDateChange} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>Category</span>
          <CategoryFilter
            categories={uniqueCategories}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      {sortedExpenses.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'gray' }}>No expenses found for the selected filters.</p>
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
