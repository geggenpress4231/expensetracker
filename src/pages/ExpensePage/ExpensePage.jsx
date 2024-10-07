import React, { useState, useMemo } from "react";
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';  
import ExpenseList from "../../components/ExpenseList/ExpenseList";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import ExpenseSearch from "../../components/ExpenseSearch"; 
import DateFilter from "../../components/DateFilter";  
import { showModal } from "../../actions/modalActions";  
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import ExpenseFormModal from "../../components/ExpenseFormModal"; // Import the ExpenseFormModal
import './ExpensePage.css';

export default function ExpensePage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState({}); // State for search parameters
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]); // Date filter state
  const [selectedCategories, setSelectedCategories] = useState([]); // Category filter state

  const expenses = useSelector((state) => state.expenses.expenses); // Assuming expenses come from Redux store

  // Show modal for Add or Edit Expense
  const showModalHandler = (expense = null) => {
    dispatch(showModal(expense));  
  };

  // Handle search (passed to the ExpenseSearch component)
  const handleSearch = (params) => {
    setSearchParams(params); 
  };

  // Handle date change for DateFilter
  const handleDateChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  // Extract unique categories from expenses and add 'All' option
  const categories = useMemo(() => {
    return ['All', ...new Set(expenses.map(expense => expense.category))];
  }, [expenses]);

  return (
    <div className="expense-page">
      <HamburgerMenu />

      <h1 className="expense-page-title">Expense Tracker</h1>

      {/* Search, Filters, and Add Expense Button in individual divs */}
      <div className="filters-container">
        <div className="filter-item">
          <DateFilter onDateChange={handleDateChange} aria-label="Filter expenses by date" />
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
          <ExpenseSearch onSearch={handleSearch} aria-label="Search expenses by description" />
        </div>
        <div className="filter-item">
          <Button 
            className="add-expense-btn" 
            type="primary" 
            onClick={() => showModalHandler()}
            aria-label="Add a new expense"
          >
            Add Expense
          </Button>
        </div>
      </div>

      {/* Expense List - pass down filter state as props */}
      <ExpenseList 
        onEditExpense={showModalHandler} 
        searchParams={searchParams} 
        selectedDateRange={selectedDateRange} 
        selectedCategories={selectedCategories}  // Passing selectedCategories correctly
        aria-label="List of filtered expenses"
      />

      {/* Use ExpenseFormModal to handle the modal display */}
      <ExpenseFormModal />
    </div>
  );
}
