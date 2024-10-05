import { combineReducers } from 'redux';  
import { modalReducer } from './modalReducer';
import { expenseReducer } from './expenseReducer'; 

const rootReducer = combineReducers({
  expenses: expenseReducer,  
  modal: modalReducer,
});

export default rootReducer;
