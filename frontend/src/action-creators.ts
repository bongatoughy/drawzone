import { ACTIONS } from "./actions";

export const onUpdateCurrentUser = (currentUser) => {
  return {
    type: ACTIONS.ON_UPDATE_CURRENT_USER,
    payload: currentUser,
  };
};
