import axios from 'axios';
import { 
  ADD_EXPENSE, 
  UPDATE_EXPENSE, 
  DELETE_EXPENSE, 
  FETCH_EXPENSES, 
  FETCH_EXPENSES_ERROR, 
  ADD_EXPENSE_ERROR, 
  UPDATE_EXPENSE_ERROR, 
  DELETE_EXPENSE_ERROR 
} from './actionTypes';

// Fetch Expenses
export const fetchExpenses = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/expenses');
    dispatch({
      type: FETCH_EXPENSES,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_EXPENSES_ERROR,
      payload: error.message,  // Dispatch error message on failure
    });
  }
};

// Add Expense
export const addExpense = (newExpense) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/expenses', newExpense);
    dispatch({
      type: ADD_EXPENSE,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_EXPENSE_ERROR,
      payload: error.message,  // Dispatch error message on failure
    });
  }
};

// Update Expense
export const updateExpense = (updatedExpense) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:5000/expenses/${updatedExpense.id}`, updatedExpense);
    dispatch({
      type: UPDATE_EXPENSE,
      payload: updatedExpense,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EXPENSE_ERROR,
      payload: error.message,  // Dispatch error message on failure
    });
  }
};

// Delete Expense
export const deleteExpense = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/expenses/${id}`);
    dispatch({
      type: DELETE_EXPENSE,
      payload: id,
    });
    return { success: true };  // Return success status
  } catch (error) {
    console.error('Error deleting expense:', error);
    return { error };  // Return the error if the request fails
  }
};
