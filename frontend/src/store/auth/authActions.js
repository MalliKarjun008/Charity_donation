import axios from "axios";
import { authActions } from "./authSlice";

export const logInUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(authActions.loginStart());
    const url = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.post(`${url}/auth/login`, {
        email,
        password,
      });

      const token = response.data.token;
      const user = response.data.user;

      // dispatch redux action
      dispatch(authActions.loginSuccess({ token, user }));

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      const errorMsg = error.response?.data?.message || "login failed";
      dispatch(authActions.loginFailed(errorMsg));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
  };
};
