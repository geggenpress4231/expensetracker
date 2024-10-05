import React from "react";
import { Button, Modal } from 'antd';  
import { useDispatch, useSelector } from 'react-redux';  
import ExpenseList from "../components/ExpenseList";
import ExpenseForm from "../components/ExpenseForm";
import HamburgerMenu from "../components/HamburgerMenu";
import { showModal, hideModal } from "../actions/modalActions";  

export default function ExpensePage() {
  const dispatch = useDispatch();

  // Access modal visibility and editing expense state from Redux
  const isModalVisible = useSelector((state) => state.modal.isModalVisible);
  const editingExpense = useSelector((state) => state.modal.editingExpense);

  
  const showModalHandler = (expense = null) => {
    dispatch(showModal(expense));  
  };

  // Handle modal cancellation
  const handleCancel = () => {
    dispatch(hideModal());  
  };

  return (
    <div>
      <HamburgerMenu />
      <h1>Expense Tracker</h1>

      {/* Button to Add New Expense */}
      <Button type="primary" onClick={() => showModalHandler()}>
        Add Expense
      </Button>

      {/* List of Expenses */}
      <ExpenseList onEditExpense={showModalHandler} />

      {/* Modal for Add/Edit Expense Form */}
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
