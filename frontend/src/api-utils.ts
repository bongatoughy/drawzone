import axios from "axios";
import { ROUTES } from "./routes";

export const getRefreshToken = async () => {
  try {
    const response = await axios.get(ROUTES.REFRESH_TOKEN);
    const { email, token } = response.data;
    return { email, token };
  } catch (e) {
    return { email: null, token: null };
  }
};
