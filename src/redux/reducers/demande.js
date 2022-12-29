import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createDemandeThunk, getAllDemandesThunk, getDemandesByUserThunk, getDemandesThunk, updateDemandeByClientThunk, updateDemandeThunk } from '../actions/demandesThunk';

import { toast } from "react-toastify";
const initialState = { 
    demande: {},
    allDemandes: [],
    userDemandes: [], 
    error: "",
    loading: false,
};


export const getAllDemandes = createAsyncThunk('demandes/getAllDemandes', getAllDemandesThunk);
export const getDemandes = createAsyncThunk('demandes/getDemandes', getDemandesThunk);
export const createDemande = createAsyncThunk('demandes/createDemande', createDemandeThunk);

export const getDemandesByUser = createAsyncThunk('demandes/getDemandesByUser', getDemandesByUserThunk); 
export const updateDemande = createAsyncThunk('demandes/updateDemande', updateDemandeThunk); 
export const updateDemandeByClient = createAsyncThunk('demandes/updateDemandeByClient', updateDemandeByClientThunk); 
// Slice
const demandeSlice = createSlice({
    name: 'demandes',
    initialState,
    reducers: {},
    extraReducers: {
      [createDemande.pending]: (state, action) => {
        state.loading = true;
      },
      [createDemande.fulfilled]: (state, action) => {
        state.loading = false;
        state.allDemandes?.push(action.payload); 
        state.userDemandes?.push(action.payload); 
        toast.success("Added Successfully"); 
      },
      [createDemande.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      },
      [getAllDemandes.pending]: (state, action) => {
        state.loading = true;
      },
      [getAllDemandes.fulfilled]: (state, action) => {
        state.loading = false;
        state.allDemandes = action.payload;
      },
      [getAllDemandes.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [getDemandes.pending]: (state, action) => {
        state.loading = true;
      },
      [getDemandes.fulfilled]: (state, action) => {
        state.loading = false;
        state.allDemandes = action.payload;
      },
      [getDemandes.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [getDemandesByUser.pending]: (state, action) => {
        state.loading = true;
      },
      [getDemandesByUser.fulfilled]: (state, action) => {
        state.loading = false;
        state.allDemandes = action.payload;
      },
      [getDemandesByUser.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [updateDemande.pending]: (state, action) => {
        state.loading = true;
      },
      [updateDemande.fulfilled]: (state, action) => {
        state.loading = false;
        const { _id } = action.payload;
        if (_id) { 
          state.allDemandes = state.allDemandes.map((item) =>
            item._id === _id ? { ...action.payload } : item
          );
        }
      },
      [updateDemande.rejected]: (state, action) => {
        state.loading = false;
        state.addError = action.payload?.message;
      },
      [updateDemandeByClient.pending]: (state, action) => {
        state.loading = true;
      },
      [updateDemandeByClient.fulfilled]: (state, action) => {
        state.loading = false;
        const { _id } = action.payload;
        if (_id) { 
          state.allDemandes = state.allDemandes.map((item) =>
            item._id === _id ? { ...action.payload } : item
          );
        }
      },
      [updateDemandeByClient.rejected]: (state, action) => {
        state.loading = false;
        state.addError = action.payload?.message;
      }     
    },
});

export default demandeSlice.reducer
