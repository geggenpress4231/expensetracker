// reducers/searchReducer.js
import { UPDATE_SEARCH_PARAMS } from '../actions/actionTypes';

const initialState = {
  description: '',
  category: '',
  amount: '',
  date: null,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_PARAMS:
      return {
        ...state,
        ...action.payload, // Update the state with new search parameters
      };
    default:
      return state;
  }
};