import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createCategorieThunk, deleteCategorieThunk, getAllCategoriesThunk, 
    getCategoriesByUserThunk, updateCategorieThunk } from '../actions/categoriesThunk';

import { toast } from "react-toastify";
const initialState = { 
    categorie: {},
    allCategories: [],     
    error: "",
    loading: false,
};

export const getAllCategories = createAsyncThunk('categories/getAllCategories', getAllCategoriesThunk);

export const createCategorie = createAsyncThunk('categories/createCategorie', createCategorieThunk); 

export const updateCategorie = createAsyncThunk('categories/updateCategorie', updateCategorieThunk);

export const deleteCategorie = createAsyncThunk('categories/deleteCategorie', deleteCategorieThunk);

// Slice
const categorieSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: {
      [createCategorie.pending]: (state, action) => {
        state.loading = true;
      },
      [createCategorie.fulfilled]: (state, action) => {
        state.loading = false;
        state.allCategories?.push(action.payload); 
        toast.success("Added Successfully"); 
      },
      [createCategorie.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      },
      [getAllCategories.pending]: (state, action) => {
        state.loading = true;
      },
      [getAllCategories.fulfilled]: (state, action) => {
        state.loading = false;
        state.allCategories = action.payload;
      },
      [getAllCategories.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      }, 
      [updateCategorie.pending]: (state, action) => {
        state.loading = true;
      },
      [updateCategorie.fulfilled]: (state, action) => {
        state.loading = false;
        const { _id } = action.payload;
        if (_id) { 
          state.allCategories = state.allCategories.map((item) =>
            item._id === _id ? action.payload : item
          );
        }
      },
      [updateCategorie.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      }
      ,
      [deleteCategorie.pending]: (state, action) => {
        state.loading = true;
      },
      [deleteCategorie.fulfilled]: (state, action) => {
        state.loading = false;
        const { _id } = action.payload;
        if (_id) { 
          state.allCategories = state.allCategories.filter((item) => item._id !== _id);
        }
      },
      [deleteCategorie.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      },
     
    },
});
 

export default categorieSlice.reducer
