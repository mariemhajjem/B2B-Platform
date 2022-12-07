import jwt_decode from "jwt-decode";
import * as api from "../../services/auth.service.js";

export const loginThunk = async (user, thunkAPI) => {
  try {
    const result = await api.login(user);
    if (result.data) localStorage.setItem("token", result.data);
    const decoded = jwt_decode(result.data); 
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

export const updateProfileThunk = async (user, thunkAPI) => {
  try {
    const result = await api.updateProfile(user);
    if (result.data) localStorage.setItem("token", result.data);
    const decoded = jwt_decode(result.data); 
    return decoded.user;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }

};

export const resetPasswordThunk = async (user, thunkAPI) => {
  try {
    const result = await api.resetPassword(user);
    return result.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }

};