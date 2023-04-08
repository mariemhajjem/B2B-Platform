import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createCommandeThunk, getAllCommandesThunk, getCommandesByUserThunk, getCommandesThunk, updateCommandeThunk } from '../actions/commandesThunk';

import { toast } from "react-toastify";
const initialState = { 
    commande: {},
    allCommandes: [],
    userCommandes: [], 
    error: "",
    loading: false,
};


export const getAllCommandes = createAsyncThunk('commandes/getAllCommandes', getAllCommandesThunk);
export const getCommandes = createAsyncThunk('commandes/getCommandes', getCommandesThunk);
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
        toast.success("Commande ajoutée avec succés"); 
      },
      [createCommande.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
        toast.error("Erreur"); 
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
        toast.error("Erreur");
      },
      [getCommandes.pending]: (state, action) => {
        state.loading = true;
      },
      [getCommandes.fulfilled]: (state, action) => {
        state.loading = false;
        state.allCommandes = action.payload;
      },
      [getCommandes.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Erreur");
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
        toast.error("Erreur");
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
        toast.error("Erreur");
      }     
    },
});

export default commandeSlice.reducer
