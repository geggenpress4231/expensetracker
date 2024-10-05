import React from 'react';
import { Modal } from 'antd';
import { useModal } from '../context/ModalContext';
import ExpenseForm from './ExpenseForm';

const ExpenseFormModal = () => {
  const { isModalVisible, hideModal, editingExpense } = useModal();  // Access modal state from context

  return (
    <Modal
      title={editingExpense ? "Edit Expense" : "Add New Expense"}
      visible={isModalVisible}
      onCancel={hideModal}
      footer={null}
    >
      <ExpenseForm expense={editingExpense} onSubmit={hideModal} />
    </Modal>
  );
};

export default ExpenseFormModal;
