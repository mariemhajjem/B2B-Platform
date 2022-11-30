import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createCommandeThunk, getAllCommandesThunk, getCommandesByUserThunk, updateCommandeThunk } from '../actions/commandesThunk';

import { toast } from "react-toastify";
const initialState = { 
    commande: {},
    allCommandes: [],
    userCommandes: [], 
    error: "",
    loading: false,
};

export const getAllCommandes = createAsyncThunk('commandes/getAllCommandes', getAllCommandesThunk);

export const createCommande = createAsyncThunk('commandes/createCommande', createCommandeThunk);

export const getCommandesByUser = createAsyncThunk('commandes/getCommandesByUser', getCommandesByUserThunk); 
export const updateCommande = createAsyncThunk('commandes/updateCommande', updateCommandeThunk); 
// Slice
const commandeSlice = createSlice({
    name: 'commandes',
    initialState,
    reducers: {},
    extraReducers: {
      [createCommande.pending]: (state, action) => {
        state.loading = true;
      },
      [createCommande.fulfilled]: (state, action) => {
        state.loading = false;
        state.allCommandes?.push(action.payload); 
        state.userCommandes?.push(action.payload); 
        toast.success("Added Successfully"); 
      },
      [createCommande.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      },
      [getAllCommandes.pending]: (state, action) => {
        state.loading = true;
      },
      [getAllCommandes.fulfilled]: (state, action) => {
        state.loading = false;
        state.allCommandes = action.payload;
      },
      [getAllCommandes.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [getCommandesByUser.pending]: (state, action) => {
        state.loading = true;
      },
      [getCommandesByUser.fulfilled]: (state, action) => {
        state.loading = false;
        state.allCommandes = action.payload;
      },
      [getCommandesByUser.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [updateCommande.pending]: (state, action) => {
        state.loading = true;
      },
      [updateCommande.fulfilled]: (state, action) => {
        state.loading = false;
        const { _id } = action.payload;
        if (_id) { 
          state.allCommandes = state.allCommandes.map((item) =>
            item._id === _id ? { ...action.payload } : item
          );
        }
      },
      [updateCommande.rejected]: (state, action) => {
        state.loading = false;
        state.addError = action.payload?.message;
      }     
    },
});

export default commandeSlice.reducer
