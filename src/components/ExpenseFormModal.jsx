import React from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { hideModal } from '../actions/modalActions';

const ExpenseFormModal = () => {
  const dispatch = useDispatch();
  
  const isModalVisible = useSelector((state) => state.modal.isModalVisible);
  const editingExpense = useSelector((state) => state.modal.editingExpense);

  const handleCancel = () => {
    dispatch(hideModal());
  };

  return (
    <Modal
      title={
        <div style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#2C3E50' }}>
          {editingExpense ? "Edit Expense" : "Add New Expense"}
        </div>
      }
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <ExpenseForm expense={editingExpense} onSubmit={handleCancel} />
    </Modal>
  );
};

export default ExpenseFormModal;
