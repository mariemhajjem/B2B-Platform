import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllUsersThunk, getUserThunk, createNewUserThunk, updateUserThunk, deleteUserThunk, blockUserThunk, getAllUsersByRoleThunk, getEntrepriseThunk } from '../actions/usersThunk';

const initialState = {
    user: null,
    entreprise: null,
    loading: false,
    error: "",
    list: [],
};
export const createNewUser = createAsyncThunk('users/createProduit', createNewUserThunk);
export const getUser = createAsyncThunk('users/getUser', getUserThunk);
export const getEntreprise = createAsyncThunk('users/getEntreprise', getEntrepriseThunk);
export const getAllUsers = createAsyncThunk('users/getAllUsers', getAllUsersThunk);
export const getAllUsersByRole = createAsyncThunk('users/getAllUsersByRole', getAllUsersByRoleThunk);
export const updateUser = createAsyncThunk('users/updateUser', updateUserThunk);
export const deleteUser = createAsyncThunk('users/deleteUser', deleteUserThunk);
export const blockUser = createAsyncThunk('users/blockUser', blockUserThunk);


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
        [getAllUsersByRole.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllUsersByRole.fulfilled]: (state, action) => {
            state.loading = false;
            state.list = action.payload;
        },
        [getAllUsersByRole.rejected]: (state, action) => {
            state.loading = false;
            state.list = [];
            state.error = action.payload?.message;
        },
        [getUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getUser.fulfilled]: (state, action) => {
            state.loading = false;
            const { _id } = action.payload;
            if (_id) {
                state.user = state.list.filter((item) => {
                    return item._id === _id;
                }); // [0] array with [selected user]
            }
            state.user = action.payload;
        },
        [getUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        },
        [getEntreprise.pending]: (state, action) => {
            state.loading = true;
        },
        [getEntreprise.fulfilled]: (state, action) => {
            state.loading = false;
            state.entreprise = action.payload;
        },
        [getEntreprise.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        },
        [updateUser.pending]: (state, action) => {
            state.loading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            const { _id } = action.payload;
            if (_id) {
                state.list = state.list.map((item) =>
                    item._id === _id ? action.payload : item
                ); 
            }
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        },
        [blockUser.pending]: (state, action) => {
            state.loading = true;
        },
        [blockUser.fulfilled]: (state, action) => {
            state.loading = false;
            const { _id }  = action.payload;
            if (_id) {
                state.list = state.list.map((item) =>
                    item._id === _id ? action.payload : item
                ); 
            }
        },
        [blockUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        },
        [deleteUser.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            const { _id } = action.payload;
            if (_id) {
                state.list = state.list.filter((item) => item._id !== _id); 
            }
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        },
    }
});
export default slice.reducer
