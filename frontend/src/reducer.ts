import { ACTIONS } from "./actions";

const initialState = {
  currentUser: null,
  token: null,
  loaded: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ON_UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.email,
        token: action.payload.token,
      };
    case ACTIONS.ON_CHECK_REFRESH_TOKEN:
      return {
        ...state,
        currentUser: action.payload.email,
        token: action.payload.token,
        loaded: true,
      };
    default:
      return state;
  }
};
