import * as api from "../../services/categorie.service";

export const getAllCategoriesThunk = async (thunkAPI) => {

  try {
    const response = await api.getAllCategories(); 
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const createCategorieThunk = async (updatedCategorieData,thunkAPI) => {
    try {
      console.log(updatedCategorieData);
      const response = await api.createNewCategorie(updatedCategorieData);
      // toast.success("Added Successfully"); 
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data || err);
    }
}; 

export const updateCategorieThunk = async (updatedCategorieData,thunkAPI) => {
    try {
      const response = await api.updateCategorie(updatedCategorieData); 
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data || err);
    }
  };

export const deleteCategorieThunk = async (id,thunkAPI) => {
    try {
      const response = await api.deleteCategorie(id); 
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data || err);
    }
};