import React, { useState } from "react";
import { Button, Modal } from 'antd';  
import { useDispatch, useSelector } from 'react-redux';  
import ExpenseList from "../components/ExpenseList";
import ExpenseForm from "../components/ExpenseForm";
import HamburgerMenu from "../components/HamburgerMenu";
import ExpenseSearch from "../components/ExpenseSearch"; // Renamed the Search component
import { showModal, hideModal } from "../actions/modalActions";  

export default function ExpensePage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState({}); // State for search parameters

  const isModalVisible = useSelector((state) => state.modal.isModalVisible);
  const editingExpense = useSelector((state) => state.modal.editingExpense);

  const showModalHandler = (expense = null) => {
    dispatch(showModal(expense));  
  };

  const handleCancel = () => {
    dispatch(hideModal());  
  };

  // Handle search (passed to the ExpenseSearch component)
  const handleSearch = (params) => {
    setSearchParams(params); // Set the search parameters
  };

  return (
    <div>
      <HamburgerMenu />
      <h1>Expense Tracker</h1>

      <Button type="primary" onClick={() => showModalHandler()}>
        Add Expense
      </Button>

      {/* Search Component */}
      <ExpenseSearch onSearch={handleSearch} />  {/* Renamed the Search component */}

      <ExpenseList onEditExpense={showModalHandler} searchParams={searchParams} />

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
    </div>
  );
}
