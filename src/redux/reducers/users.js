import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllUsersThunk, getUserThunk, createNewUserThunk, updateUserThunk, deleteUserThunk } from '../actions/usersThunk';
import { toast } from "react-toastify";

const initialState = {
    user: null,
    loading: false,
    error: "",
    list: [],
};
export const createNewUser = createAsyncThunk('users/createProduit', createNewUserThunk);
export const getUser = createAsyncThunk('users/getUser', getUserThunk);
export const getAllUsers = createAsyncThunk('users/getAllUsers', getAllUsersThunk);
export const updateUser = createAsyncThunk('users/updateUser', updateUserThunk);
export const deleteUser = createAsyncThunk('users/deleteUser', deleteUserThunk);


// Slice
const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.list = action.payload;
        },
        [getAllUsers.rejected]: (state, action) => {
            state.loading = false;
            state.list = [];
            state.error = action.payload?.message;
        },
        [getUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getUser.fulfilled]: (state, action) => {
            state.loading = false;
            const { id } = action.payload;
            if (id) {
                state.user = state.list.filter((item) => {
                    return item._id === id;
                }); // [0] array with [selected user]
            }
            state.user = action.payload;
        },
        [getUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        },
        [updateUser.pending]: (state, action) => {
            state.loading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            const {
                arg: { id },
            } = action.meta;
            if (id) {
                state.list = state.list.map((item) =>
                    item._id === id ? action.payload : item
                ); 
            }
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        }
        ,
        [deleteUser.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            const {
                arg: { id },
            } = action.meta;
            if (id) {
                state.list = state.list.filter((item) => item._id !== id); 
            }
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        },
    }
});
export default slice.reducer
