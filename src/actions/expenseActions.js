// actions/expenseActions.js
import axios from 'axios';
import { ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE, FETCH_EXPENSES } from './actionTypes';

export const fetchExpenses = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/expenses');  
    dispatch({
      type: FETCH_EXPENSES,
      payload: response.data,  
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
};
export const addExpense = (newExpense) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/expenses', newExpense);
    dispatch({
      type: ADD_EXPENSE,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error adding expense:', error);
  }
};

export const updateExpense = (updatedExpense) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:5000/expenses/${updatedExpense.id}`, updatedExpense);
    dispatch({
      type: UPDATE_EXPENSE,
      payload: updatedExpense,
    });
  } catch (error) {
    console.error('Error updating expense:', error);
  }
};




export const deleteExpense = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/expenses/${id}`);
    dispatch({
      type: DELETE_EXPENSE,
      payload: id,
    });
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
};
