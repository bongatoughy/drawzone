import { ACTIONS } from "./actions";
import { getRefreshToken } from "./api-utils";

export const onCheckRefreshToken = () => async (dispatch) => {
  const { email, token } = await getRefreshToken();
  dispatch({ type: ACTIONS.ON_CHECK_REFRESH_TOKEN, payload: { email, token } });
};
