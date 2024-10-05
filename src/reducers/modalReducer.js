// modalReducer.js
const initialState = {
    isModalVisible: false,
    editingExpense: null,
  };
  
  export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_MODAL':
        return {
          ...state,
          isModalVisible: true,
          editingExpense: action.payload,  // Expense to edit (if any)
        };
      case 'HIDE_MODAL':
        return {
          ...state,
          isModalVisible: false,
          editingExpense: null,
        };
      default:
        return state;
    }
  };
  