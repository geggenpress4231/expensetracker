import { SHOW_MODAL, HIDE_MODAL } from './actionTypes';

export const showModal = (expense = null) => ({
  type: SHOW_MODAL,
  payload: expense,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});
