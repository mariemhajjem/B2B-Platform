import * as api from "../../services/reclamation.service";

export const getAllReclamationsThunk = async (thunkAPI) => {

  try {
    const response = await api.getAllReclamations();

    console.log(response)
    return response.data;
  } catch (err) {
    console.log(err?.message)
    return thunkAPI.rejectWithValue(err?.response?.data || err?.message || err);
  }
};

export const createReclamationThunk = async (updatedReclamationData, thunkAPI) => {
  try {
    console.log(updatedReclamationData);
    const response = await api.createNewReclamation(updatedReclamationData);
    // toast.success("Added Successfully"); 
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const getReclamationsByUserThunk = async (user, thunkAPI) => {
  try {
    let response = await api.getAllReclamationsByUser(user);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const getReclamationsThunk = async (user,thunkAPI) => {
  try {
    const response = await api.getAllReclamationsByUser(user);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const deleteReclamationThunk = async (id, thunkAPI) => {
  try {
    const response = await api.deleteReclamation(id);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};
