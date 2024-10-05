import React, { createContext, useContext, useState } from 'react';

// Create a ModalContext
const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);  // State for editing expense

  const showModal = (expense = null) => {
    setEditingExpense(expense);
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
    setEditingExpense(null);
  };

  return (
    <ModalContext.Provider value={{ isModalVisible, showModal, hideModal, editingExpense }}>
      {children}
    </ModalContext.Provider>
  );
};
