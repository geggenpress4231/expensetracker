import { combineReducers } from 'redux';  
import { modalReducer } from './modalReducer';
import { expenseReducer } from './expenseReducer'; 
import { searchReducer } from './searchReducer';

const rootReducer = combineReducers({
  expenses: expenseReducer,  
  modal: modalReducer,
  search: searchReducer,
});

export default rootReducer;
