import * as api from "../../services/produit.service";

export const getAllProduitsThunk = async (thunkAPI) => {

  try {
    const response = await api.getAllProduits();

    console.log(response)
    return response.data;
  } catch (err) {
    console.log(err?.message)
    return thunkAPI.rejectWithValue(err?.response?.data || err?.message || err);
  }
};

export const createProduitThunk = async (updatedProduitData,thunkAPI) => {
    try {
      console.log(updatedProduitData);
      const response = await api.createNewProduit(updatedProduitData);
      // toast.success("Added Successfully"); 
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data || err);
    }
};


export const getProduitsByUserThunk = async (userId,thunkAPI) => {
    try {
      const response = await api.getProduit(`/tour/userProduits/${userId}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data || err);
    }
  };


export const updateProduitThunk = async (updatedProduitData,thunkAPI) => {
    try {
      const response = await api.updateProduit(updatedProduitData); 
      console.log(response.data)
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data || err);
    }
  };

export const deleteProduitThunk = async (id,thunkAPI) => {
    try {
      const response = await api.deleteProduit(id); 
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data || err);
    }
};