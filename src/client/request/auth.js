import axios from "axios";

export const signUpRequest = ({ name, phone, email, password }) => {
  return axios
    .post(`${process.env.API_URL}/api/auth/signup`, {
      name,
      phone,
      email,
      password,
    })
    .then(() => {
      return { status: true };
    })
    .catch((err) => {
      return {
        status: false,
        errCode: err.response.status,
        message: err.response.data.message,
      };
    });
};

export const signInRequest = ({ email, password }) => {
  return axios
    .post(`${process.env.API_URL}/api/auth/signin`, {
      email: email,
      password: password,
    })
    .then((res) => {
      axios.defaults.withCredentials = true;
      return { status: true, token: res.data.token };
    })
    .catch((err) => {
      return {
        status: false,
        errCode: err.response.status,
        message: err.response.data.message,
      };
    });
};

export const signOutRequest = () => {
  return axios
    .get(`${process.env.API_URL}/api/auth/signout`)
    .then(() => {
      console.log(true);
      return true;
    })
    .catch(() => {
      return false;
    });
};
