import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createReclamationThunk, getAllReclamationsThunk, getReclamationsByUserThunk, getReclamationsThunk } from '../actions/reclamationsThunk';

import { toast } from "react-toastify";
const initialState = { 
    reclamation: {},
    allReclamations: [],
    error: "",
    loading: false,
};


export const getAllReclamations = createAsyncThunk('reclamations/getAllReclamations', getAllReclamationsThunk);
export const getReclamations = createAsyncThunk('reclamations/getReclamations', getReclamationsThunk);
export const createReclamation = createAsyncThunk('reclamations/createReclamation', createReclamationThunk);
export const getReclamationsByUser = createAsyncThunk('reclamations/getReclamationsByUser', getReclamationsByUserThunk); 

// Slice
const reclamationSlice = createSlice({
    name: 'reclamations',
    initialState,
    reducers: {},
    extraReducers: {
      [createReclamation.pending]: (state, action) => {
        state.loading = true;
      },
      [createReclamation.fulfilled]: (state, action) => {
        state.loading = false;
        state.allReclamations?.push(action.payload); 
        toast.success("Added Successfully"); 
      },
      [createReclamation.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      },
      [getAllReclamations.pending]: (state, action) => {
        state.loading = true;
      },
      [getAllReclamations.fulfilled]: (state, action) => {
        state.loading = false;
        state.allReclamations = action.payload;
      },
      [getAllReclamations.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [getReclamations.pending]: (state, action) => {
        state.loading = true;
      },
      [getReclamations.fulfilled]: (state, action) => {
        state.loading = false;
        state.allReclamations = action.payload;
      },
      [getReclamations.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [getReclamationsByUser.pending]: (state, action) => {
        state.loading = true;
      },
      [getReclamationsByUser.fulfilled]: (state, action) => {
        state.loading = false;
        state.allReclamations = action.payload;
      },
      [getReclamationsByUser.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },  
    },
});

export default reclamationSlice.reducer
