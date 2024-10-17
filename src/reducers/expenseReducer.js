import { 
  ADD_EXPENSE, 
  UPDATE_EXPENSE, 
  DELETE_EXPENSE, 
  FETCH_EXPENSES, 
  FETCH_EXPENSES_ERROR, 
  ADD_EXPENSE_ERROR, 
  UPDATE_EXPENSE_ERROR, 
  DELETE_EXPENSE_ERROR 
} from '../actions/actionTypes';

const initialState = {
  expenses: [],  
  error: null,  // To store error messages
};

export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
        error: null,  // Reset error on successful fetch
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        error: null,  // Reset error on successful add
      };
    case UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
        error: null,  // Reset error on successful update
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
        error: null,  // Reset error on successful delete
      };

    // Handle Errors
    case FETCH_EXPENSES_ERROR:
      return {
        ...state,
        error: action.payload,  // Set error message from action
      };
    case ADD_EXPENSE_ERROR:
      return {
        ...state,
        error: action.payload,  // Set error message from action
      };
    case UPDATE_EXPENSE_ERROR:
      return {
        ...state,
        error: action.payload,  // Set error message from action
      };
    case DELETE_EXPENSE_ERROR:
      return {
        ...state,
        error: action.payload,  // Set error message from action
      };
    
    default:
      return state;
  }
};
