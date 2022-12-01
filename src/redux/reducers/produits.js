import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createProduitThunk, deleteProduitThunk, getAllProduitsThunk, getProduitByIdThunk, getProduitsByUserThunk, updateProduitThunk } from '../actions/produitsThunk';

import { toast } from "react-toastify";
const initialState = {
  produit: {},
  allProduits: [],
  userProduits: [],
  tagProduits: [],
  relatedProduits: [],
  currentPage: 1,
  numberOfPages: null,
  addError: "",
  getError: "",
  loading: false,
};

export const getAllProduits = createAsyncThunk('produits/getAllProduits', getAllProduitsThunk);

export const createProduit = createAsyncThunk('produits/createProduit', createProduitThunk);

export const getProduitsByUser = createAsyncThunk('produits/getProduitsByUser', getProduitsByUserThunk);
export const getProduitById = createAsyncThunk('produits/getProduitById', getProduitByIdThunk);

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
    setProduit: (state, action) => {
      state.produit = action.payload;
    },
    clearFilters: (state, action) => {
      ;
    },
    clearErrors: (state, action) => {
      state.addError = "";
      state.getError = "";
    },
  },
  extraReducers: {
    [createProduit.pending]: (state, action) => {
      state.loading = true;
    },
    [createProduit.fulfilled]: (state, action) => {
      state.loading = false;
      state.allProduits?.push(action.payload);
      state.userProduits?.push(action.payload);
      toast.success(`${action.payload.product_label} ajouté`);
    },
    [createProduit.rejected]: (state, action) => {
      state.loading = false;
      state.addError = action.payload?.message;
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
      state.getError = action.payload;
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
      state.getError = action.payload;
    },
    [getProduitById.pending]: (state, action) => {
      state.loading = true;
    },
    [getProduitById.fulfilled]: (state, action) => {
      state.loading = false;
      state.produit = action.payload;
    },
    [getProduitById.rejected]: (state, action) => {
      state.loading = false;
      state.getError = action.payload;
    },

    [updateProduit.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProduit.fulfilled]: (state, action) => {
      state.loading = false;
      const { _id } = action.payload;
      if (_id) {
        state.userProduits = state.userProduits.map((item) =>
          item._id === _id ? action.payload : item
        );
        state.allProduits = state.allProduits.map((item) =>
          item._id === _id ? { ...action.payload, category_id: action.payload.category_id?.category_name, category_obj: action.payload.category_id } : item
        );
      }
    },
    [updateProduit.rejected]: (state, action) => {
      state.loading = false;
      state.addError = action.payload?.message;
    }
    ,
    [deleteProduit.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProduit.fulfilled]: (state, action) => {
      state.loading = false;
      const { _id } = action.payload;
      if (_id) {
        state.userProduits = state.userProduits.filter((item) => item._id !== _id);
        state.allProduits = state.allProduits.filter((item) => item._id !== _id);
      }
    },
    [deleteProduit.rejected]: (state, action) => {
      state.loading = false;
      state.getError = action.payload?.message;
    },

  },
});

// Actions
export const { setCurrentPage, setProduit, clearErrors } = produitSlice.actions

export default produitSlice.reducer
