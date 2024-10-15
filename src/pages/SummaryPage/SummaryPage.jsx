import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';
import { fetchExpenses } from '../../actions/expenseActions';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import DateFilter from '../../components/DateFilter'; 
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import moment from 'moment';
import './SummaryPage.css';

export default function SummaryPage() {
  const dispatch = useDispatch();

  // Fetch expenses from Redux store
  const expenses = useSelector((state) => state.expenses.expenses);
  const loading = useSelector((state) => state.expenses.loading);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);  // State for selected date range

  // Fetch the expenses data when the component loads
  useEffect(() => {
    dispatch(fetchExpenses());  // Trigger the API call to fetch expenses
  }, [dispatch]);

  // Calculate total expenses within the selected date range
  const totalExpenses = useMemo(() => {
    const filteredExpenses = expenses.filter(expense => {
      const expenseDate = moment(expense.date, 'YYYY-MM-DD');
      const isInRange = dateRange[0] && dateRange[1]
        ? expenseDate.isBetween(moment(dateRange[0], 'YYYY-MM-DD'), moment(dateRange[1], 'YYYY-MM-DD'), 'days', '[]')
        : true;
      return isInRange;
    });
    return filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses, dateRange]);

  // Filter expenses based on selected categories and date range
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const expenseDate = moment(expense.date, 'YYYY-MM-DD');
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes('All') || selectedCategories.includes(expense.category);
      const matchesDateRange = dateRange[0] && dateRange[1]
        ? expenseDate.isBetween(moment(dateRange[0], 'YYYY-MM-DD'), moment(dateRange[1], 'YYYY-MM-DD'), 'days', '[]')
        : true;
      return matchesCategory && matchesDateRange;
    });
  }, [selectedCategories, dateRange, expenses]);

  // Extract unique categories for the dropdown
  const categories = useMemo(() => {
    return ['All', ...new Set(expenses.map(expense => expense.category))];
  }, [expenses]);

  // Handle date range change (coming from DateFilter)
  const handleDateChange = (dateStrings) => {
    setDateRange(dateStrings ? [dateStrings[0], dateStrings[1]] : [null, null]);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (expenses.length === 0) {
    // Case 1: No expenses at all, show welcome message
    return (
      <div className="summary-page-container">
        <HamburgerMenu className="hamburger-menu" />
        <h1 className="summary-page-title">Expense Summary</h1>
        <div className="no-expenses-message-container">
          <p className="no-expenses-message">
            Start tracking your expenses efficiently! <br />
            Add your first expense to see the summary here.
          </p>
        </div>
      </div>
    );
  }
  
  if (filteredExpenses.length === 0 && expenses.length > 0) {
    // Case 2: No expenses matching the filters
    return (
      <div className="summary-page-container">
        <HamburgerMenu className="hamburger-menu" />
        <h1 className="summary-page-title">Expense Summary</h1>
        <div className="filter-expense-container">
          <div className="filter-item">
            <DateFilter 
              onDateChange={handleDateChange} 
              aria-label="Filter expenses by date" 
            />
          </div>
          <div className="filter-item">
            <CategoryFilter
              categories={categories}
              onCategoryChange={setSelectedCategories}
              selectedCategories={selectedCategories}
              allowMultiple={true}
              aria-label="Filter expenses by category"  
            />
          </div>
        </div>
        <div className="no-expenses-message-container">
          <p className="no-expenses-message">
            No expenses match the selected filters. Please adjust the filters to see your expenses.
          </p>
        </div>
      </div>
    );
  }
  


  // Case 3: Display charts and total expenses
  return (
    <div className="summary-page-container">
      <HamburgerMenu className="hamburger-menu" />
      <h1 className="summary-page-title">Expense Summary</h1>

      {/* Filters and Total Expenses in One Row */}
      <div className="filter-expense-container">
        <div className="filter-item">
          <DateFilter 
            onDateChange={handleDateChange} 
            aria-label="Filter expenses by date" 
          />
        </div>

        <div className="filter-item">
          <CategoryFilter
            categories={categories}
            onCategoryChange={setSelectedCategories}
            selectedCategories={selectedCategories}
            allowMultiple={true}
            aria-label="Filter expenses by category"  
          />
        </div>

        <div className="filter-item">
          <h2 className="total-expenses" aria-live="polite">Total Expenses: ${totalExpenses.toFixed(2)}</h2>
        </div>
      </div>

      {/* Charts Container */}
      <div className="charts-container">
        <div className="bar-chart-container">
          <BarChart 
            data={filteredExpenses} 
            aria-label="Bar chart showing filtered expenses"  
          />
        </div>

        <div className="pie-chart-container">
          <PieChart 
            data={filteredExpenses} 
            aria-label="Pie chart showing expense distribution by category"  
          />
        </div>
      </div>
    </div>
  );
}
