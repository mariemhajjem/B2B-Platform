import * as api from "../../services/produit.service";

export const getAllProduitsThunk = async (thunkAPI) => {

  try {
    const response = await api.getAllProduits();
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err?.message || err);
  }
};

export const createProduitThunk = async (updatedProduitData, thunkAPI) => {
  try {
    const response = await api.createNewProduit(updatedProduitData);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const getProduitsByUserThunk = async (user, thunkAPI) => {
  try {
    const response = await api.getAllProduitsByUser(user);

    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const getProduitsByCategoryThunk = async (category_id, thunkAPI) => {
  try {
    const response = await api.getProduitsByCategory(category_id);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const getProduitByIdThunk = async (id, thunkAPI) => {
  try {
    const response = await api.getProduit(id);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const updateProduitThunk = async (updatedProduitData, thunkAPI) => {
  try {
    const response = await api.updateProduit(updatedProduitData);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const deleteProduitThunk = async (id, thunkAPI) => {
  try {
    const response = await api.deleteProduit(id);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};