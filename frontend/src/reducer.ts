import { ACTIONS } from "./actions";

const initialState = {
  currentUser: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ON_UPDATE_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
