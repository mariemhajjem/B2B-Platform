import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { loginThunk, registerThunk, logoutThunk, updateProfileThunk, resetPasswordThunk } from "../actions/authThunk"

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
export const updateProfile = createAsyncThunk('auth/updateProfile', updateProfileThunk);
export const resetPassword = createAsyncThunk('auth/resetPassword', resetPasswordThunk);
export const logout = createAsyncThunk('auth/logout', logoutThunk);
// Slice
const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearErrors: (state, action) => {
            state.error = ""; 
        },
    },
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
        [updateProfile.pending]: (state, action) => {
            state.loading = true;
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.loading = false;
            state.loggedUser = action.payload;
        },
        [updateProfile.rejected]: (state, action) => {
            state.loading = false;
            state.loggedUser = null;
            state.error = action.payload?.message;
        },
        [resetPassword.pending]: (state, action) => {
            state.loading = true;
        },
        [resetPassword.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [resetPassword.rejected]: (state, action) => {
            state.loading = false;
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
export const { clearErrors } = slice.actions
export default slice.reducer
