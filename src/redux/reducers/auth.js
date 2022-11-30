import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { loginThunk, registerThunk, logoutThunk } from "../actions/authThunk"

const loggedUser = localStorage.getItem("token")
    ? jwt_decode(localStorage.getItem("token"))
    : null;

const initialState = {
    loggedUser: loggedUser?.user,
    error: "",
    loading: false,
}

export const register = createAsyncThunk('auth/register', registerThunk);
export const login = createAsyncThunk('auth/login', loginThunk);
export const logout = createAsyncThunk('auth/logout', logoutThunk);
// Slice
const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [register.pending]: (state, action) => {
            state.loading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            state.loggedUser = action.payload;
            toast.success(`Bienvenue ${action.payload.firstName} ${action.payload.lastName}`);
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.loggedUser = null;
            state.error = action.payload;
        },
        [login.pending]: (state, action) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.loggedUser = action.payload;
            toast.success(`Bienvenue ${action.payload.firstName} ${action.payload.lastName}`);
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.loggedUser = null;
            state.error = action.payload?.message;
        },
        [logout.pending]: (state, action) => {
            state.loading = true;
        },
        [logout.fulfilled]: (state, action) => {
            state.loading = false;
            state.loggedUser = null;
            toast.success("logged out Successfully",{autoClose: 1000});
        },
        [logout.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        },
    }
});
export default slice.reducer
