import React from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';  // Import useSelector and useDispatch from Redux
import ExpenseForm from './ExpenseForm';
import { hideModal } from '../actions/modalActions';  // Import hideModal action

const ExpenseFormModal = () => {
  const dispatch = useDispatch();
  
  // Access modal state from Redux using useSelector
  const isModalVisible = useSelector((state) => state.modal.isModalVisible);
  const editingExpense = useSelector((state) => state.modal.editingExpense);

  const handleCancel = () => {
    dispatch(hideModal());  // Dispatch the hideModal action
  };

  return (
    <Modal
      title={editingExpense ? "Edit Expense" : "Add New Expense"}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <ExpenseForm expense={editingExpense} onSubmit={handleCancel} />
    </Modal>
  );
};

export default ExpenseFormModal;
