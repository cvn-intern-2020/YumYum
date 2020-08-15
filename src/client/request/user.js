import axios from "axios";
import { clearUser } from "../actions/user";

export const getUserRequest = () => {
  return axios
    .get(`${process.env.API_URL}/api/users`)
    .then((res) => {
      return { status: true, userData: res.data };
    })
    .catch((err) => {
      return {
        status: false,
        errCode: err.response.status,
        message: err.response.data.message,
      };
    });
};
