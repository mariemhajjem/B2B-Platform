import * as api from "../../services/commande.service";

export const getAllCommandesThunk = async (thunkAPI) => {

  try {
    const response = await api.getAllCommandes();

    console.log(response)
    return response.data;
  } catch (err) {
    console.log(err?.message)
    return thunkAPI.rejectWithValue(err?.response?.data || err?.message || err);
  }
};

export const createCommandeThunk = async (updatedCommandeData, thunkAPI) => {
  try {
    console.log(updatedCommandeData);
    const response = await api.createNewCommande(updatedCommandeData);
    // toast.success("Added Successfully"); 
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const getCommandesByUserThunk = async (user, thunkAPI) => {
  try {
    let response = await api.getAllCommandesByUser(user);

    const getCommandeFournisseur = (data) => {
      let children = [];
      const flattenCommandeFournisseur = data.map(commande => {

        commande.list.map(m => {
          children = [...children, ...m.commande_summary];
          console.log("children : ", children)
          return m;
        });
        const c ={commande, list : children};
        children = [];
        return c;
        
      })
      return flattenCommandeFournisseur
    };

    const data = getCommandeFournisseur(response.data)
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const getCommandesThunk = async (user,thunkAPI) => {
  try {
    const response = await api.getAllCommandesByUser(user);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const updateCommandeThunk = async (updatedCommandeData, thunkAPI) => {
  try {
    const response = await api.updateCommande(updatedCommandeData);
    console.log(response.data)
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};
