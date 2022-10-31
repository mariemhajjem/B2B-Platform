import { createSlice } from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";

const loggedUser = localStorage.getItem("token")
    ? jwt_decode(localStorage.getItem("token"))
    : null;

// Slice
const slice = createSlice({
    name: 'auth',
    initialState: loggedUser ? { loggedUser }
        : { loggedUser: null },
    reducers: {
        loginSuccess: (state, action) => {
            state.loggedUser = action.payload;
        },
        loginFail: (state, action) => {
            state.loggedUser = null;
        },
        logoutSuccess: (state, action) => {
            state.loggedUser = null;
        },
    },
});
export default slice.reducer
// Actions
export const { loginSuccess, loginFail, logoutSuccess } = slice.actions