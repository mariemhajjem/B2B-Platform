import * as api from "../../services/produit.service";

export const getAllProduitsThunk = async (thunkAPI) => {

  try {
    const response = await api.getAllProduits();
    const produits = response.data?.map((produit) => {
      let binaryString = ""
      for (let i = 0; i < produit.product_picture?.data?.data.length; i++) {
        binaryString += String.fromCharCode(produit.product_picture?.data?.data[i])
      }
      const base64String = btoa(binaryString);
      return { ...produit,product_picture: `data:${produit.product_picture?.contentType};base64,${base64String}`}
    })

    return produits;
  } catch (err) {
    console.log(err?.message)
    return thunkAPI.rejectWithValue(err?.response?.data || err?.message || err);
  }
};

export const createProduitThunk = async (updatedProduitData, thunkAPI) => {
  try {
    console.log(updatedProduitData);
    const response = await api.createNewProduit(updatedProduitData);
    // toast.success("Added Successfully"); 
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const getProduitsByUserThunk = async (user, thunkAPI) => {
  try {
    const response = await api.getAllProduitsByUser(user);
    console.log(response)

    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};
export const getProduitByIdThunk = async (id, thunkAPI) => {
  try {
    const response = await api.getProduit(id);
    console.log(response)

    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const updateProduitThunk = async (updatedProduitData, thunkAPI) => {
  try {
    const response = await api.updateProduit(updatedProduitData);
    console.log(response.data)
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