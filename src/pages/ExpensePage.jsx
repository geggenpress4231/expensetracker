import React, { useState } from "react";
import { Button, Modal } from 'antd';  
import { useDispatch, useSelector } from 'react-redux';  
import ExpenseList from "../components/ExpenseList";
import ExpenseForm from "../components/ExpenseForm";
import HamburgerMenu from "../components/HamburgerMenu";
import ExpenseSearch from "../components/ExpenseSearch"; 
import DateFilter from "../components/DateFilter";  
import CategoryFilter from "../components/CategoryFilter";  
import { showModal, hideModal } from "../actions/modalActions";  
import './ExpensePage.css';

export default function ExpensePage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState({}); // State for search parameters
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]); // Date filter state
  const [selectedCategory, setSelectedCategory] = useState("All"); // Category filter state

  const isModalVisible = useSelector((state) => state.modal.isModalVisible);
  const editingExpense = useSelector((state) => state.modal.editingExpense);

  // Show modal for Add or Edit Expense
  const showModalHandler = (expense = null) => {
    dispatch(showModal(expense));  
  };

  const handleCancel = () => {
    dispatch(hideModal());  
  };

  // Handle search (passed to the ExpenseSearch component)
  const handleSearch = (params) => {
    setSearchParams(params); 
  };

  // Handle date change for DateFilter
  const handleDateChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  // Handle category change for CategoryFilter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category || "All");
  };

  const categories = ["Food", "Transport", "Health", "Entertainment", "Bills"]; 

  return (
    <div className="expense-page">
      <HamburgerMenu />

      <h1>Expense Tracker</h1>

      {/* Search, Filters, and Add Expense Button in individual divs */}
      <div className="filters-container">
        <div className="filter-item">
          <ExpenseSearch onSearch={handleSearch} />
        </div>
        <div className="filter-item">
          <DateFilter onDateChange={handleDateChange} />
        </div>
        <div className="filter-item">
          <CategoryFilter categories={categories} onCategoryChange={handleCategoryChange} />
        </div>
        <div className="filter-item">
          <Button className="add-expense-btn" type="primary" onClick={() => showModalHandler()}>
            Add Expense
          </Button>
        </div>
      </div>

      {/* Expense List - pass down filter state as props */}
      <ExpenseList 
        onEditExpense={showModalHandler} 
        searchParams={searchParams} 
        selectedDateRange={selectedDateRange} 
        selectedCategory={selectedCategory} 
      />

      {isModalVisible && (
        <Modal
          title={editingExpense ? "Edit Expense" : "Add New Expense"}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <ExpenseForm 
            expense={editingExpense}
            onSubmit={handleCancel} 
          />
        </Modal>
      )}
    </div>
  );
}
