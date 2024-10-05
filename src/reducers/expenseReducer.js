import { ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE, FETCH_EXPENSES } from '../actions/actionTypes';

const initialState = {
  expenses: [],  
};

export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EXPENSES:
      return {
        ...state,
        expenses: action.payload, 
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload], 
      };
    case UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };
    default:
      return state;
  }
};
