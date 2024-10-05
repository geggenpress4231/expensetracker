import { UPDATE_SEARCH_PARAMS } from "./actionTypes";

// Action to update search parameters in the store
export const updateSearchParams = (params) => ({
  type: UPDATE_SEARCH_PARAMS,
  payload: params,
});