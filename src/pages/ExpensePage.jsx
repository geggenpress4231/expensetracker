import React, { useState } from "react";
import { Button, Modal } from 'antd';  
import ExpenseList from "../components/ExpenseList";
import ExpenseForm from "../components/ExpenseForm";
import HamburgerMenu from "../components/HamburgerMenu";
import { ExpenseProvider } from "../context/ExpenseContext";  

export default function ExpensePage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);  

  // Show the modal and optionally pre-fill with the expense to edit
  const showModal = (expense = null) => {
    setEditingExpense(expense);
    setIsModalVisible(true);
  };

  // Hide the modal after submission
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingExpense(null);
  };

  return (
    <ExpenseProvider>
      <div>
        <HamburgerMenu/>
        <h1>Expense Tracker</h1>

        {/* Button to Add New Expense */}
        <Button type="primary" onClick={() => showModal()}>
          Add Expense
        </Button>

        {/* List of Expenses */}
        <ExpenseList onEditExpense={showModal} />

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
    </ExpenseProvider>
  );
}
