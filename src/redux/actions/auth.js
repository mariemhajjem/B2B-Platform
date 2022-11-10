import { loginSuccess, loginFail, logoutSuccess } from "../reducers/auth";
import { SET_ERRORS } from "../reducers/error";
import * as api from "../../services/auth.service.js";

export const login = (user) => async (dispatch) => {

  try {
    const loggedUser = await api.login(user);
    console.log("loggedUser from action:",loggedUser)
    dispatch(loginSuccess({
       loggedUser
    }));
  } catch (err) {
    console.log(err);
    dispatch(SET_ERRORS({
      message: err.response?.data?.message,
      code: err.response?.data?.code
    }))
    dispatch(loginFail({
        loggedIn: false,
        message: err.response?.data?.message
      }));
  }
};

export const register = (user) => async (dispatch) => {

  try {
    const loggedUser = await api.register(user);
    dispatch(loginSuccess({
       loggedUser
    }));
  } catch (err) {
    dispatch(SET_ERRORS({
      message: err.response?.data?.message,
      code: err.response?.data?.code
    }))
    console.log(err);
    dispatch(loginFail({
        loggedIn: false, 
      }));
  }
};

export const logout = () => async (dispatch) => { 

  localStorage.removeItem("token");
  dispatch(logoutSuccess());
};