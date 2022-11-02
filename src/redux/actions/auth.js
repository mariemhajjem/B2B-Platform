import { loginSuccess, loginFail, logoutSuccess } from "../reducers/auth";
import * as api from "../../services/auth.service.js";

export const login = (user) => async (dispatch) => {

  try {
    const loggedUser = await api.login(user);
    dispatch(loginSuccess({
       loggedUser
    }));
  } catch (e) {
    console.log(e);
    dispatch(loginFail({
        loggedIn: false,
        message: e.response.data.message
      }));
  }
};

export const register = (user) => async (dispatch) => {

  try {
    const loggedUser = await api.register(user);
    dispatch(loginSuccess({
       loggedUser
    }));
  } catch (e) {
    console.log(e);
    dispatch(loginFail({
        loggedIn: false,
        message: e.response.data.message
      }));
  }
};

export const logout = () => async (dispatch) => { 

  localStorage.removeItem("token");
  dispatch(logoutSuccess({
      token: null,
      user: null
  }));
};