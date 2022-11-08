import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createProduitThunk, deleteProduitThunk, getAllProduitsThunk, getProduitsByUserThunk, updateProduitThunk } from '../actions/produitsThunk';

import { toast } from "react-toastify";
const initialState = { 
    produit: {},
    allProduits: [],
    userProduits: [],
    tagProduits: [],
    relatedProduits: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
};

export const getAllProduits = createAsyncThunk('produits/getAllProduits', getAllProduitsThunk);

export const createProduit = createAsyncThunk('produits/createProduit', createProduitThunk);

export const getProduitsByUser = createAsyncThunk('produits/getProduitsByUser', getProduitsByUserThunk);

export const updateProduit = createAsyncThunk('produits/updateProduit', updateProduitThunk);

export const deleteProduit = createAsyncThunk('produits/deleteProduit', deleteProduitThunk);

// Slice
const produitSlice = createSlice({
    name: 'produits',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: {
      [createProduit.pending]: (state, action) => {
        state.loading = true;
      },
      [createProduit.fulfilled]: (state, action) => {
        state.loading = false;
        state.allProduits?.push(action.payload); 
        toast.success("Added Successfully"); 
      },
      [createProduit.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      },
      [getAllProduits.pending]: (state, action) => {
        state.loading = true;
      },
      [getAllProduits.fulfilled]: (state, action) => {
        state.loading = false;
        state.allProduits = action.payload;
      },
      [getAllProduits.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      },
      [getProduitsByUser.pending]: (state, action) => {
        state.loading = true;
      },
      [getProduitsByUser.fulfilled]: (state, action) => {
        state.loading = false;
        state.userProduits = action.payload;
      },
      [getProduitsByUser.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      },
  
      [updateProduit.pending]: (state, action) => {
        state.loading = true;
      },
      [updateProduit.fulfilled]: (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.userProduits = state.userProduits.map((item) =>
            item._id === id ? action.payload : item
          );
          state.allProduits = state.allProduits.map((item) =>
            item._id === id ? action.payload : item
          );
        }
      },
      [updateProduit.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      }
      ,
      [deleteProduit.pending]: (state, action) => {
        state.loading = true;
      },
      [deleteProduit.fulfilled]: (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.userProduits = state.userProduits.filter((item) => item._id !== id);
          state.produits = state.produits.filter((item) => item._id !== id);
        }
      },
      [deleteProduit.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      },
     
    },
});

// Actions
export const { setCurrentPage } = produitSlice.actions

export default produitSlice.reducer
