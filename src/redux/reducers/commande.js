import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createCommandeThunk, getAllCommandesThunk, getCommandesByUserThunk } from '../actions/commandesThunk';

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
        state.userCommandes = action.payload;
      },
      [getCommandesByUser.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }     
    },
});

export default commandeSlice.reducer
