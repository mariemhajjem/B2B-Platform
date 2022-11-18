import jwt_decode from "jwt-decode";
import * as api from "../../services/auth.service.js";

export const loginThunk = async (user, thunkAPI) => {
  try {
    const result = await api.login(user);
    console.log(result)
    if (result.data) localStorage.setItem("token", result.data);
    const decoded = jwt_decode(result.data);
    console.log("logeduser login thunk function: ", decoded.user)
    return decoded.user;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const registerThunk = async (user, thunkAPI) => {

  try {
    const result = await api.register(user);
    if (result.data) localStorage.setItem("token", result.data);
    console.log("register thunk function: ",result)
    const decoded = jwt_decode(result.data);
    return decoded.user;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data);
  }
};

export const logoutThunk = (thunkAPI) => {
  try {
    localStorage.removeItem("token");
    return;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }


};