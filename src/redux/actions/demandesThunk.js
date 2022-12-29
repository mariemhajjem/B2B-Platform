import * as api from "../../services/demande.service";

export const getAllDemandesThunk = async (thunkAPI) => {

  try {
    const response = await api.getAllDemandes();

    console.log(response)
    return response.data;
  } catch (err) {
    console.log(err?.message)
    return thunkAPI.rejectWithValue(err?.response?.data || err?.message || err);
  }
};

export const createDemandeThunk = async (updatedDemandeData, thunkAPI) => {
  try {
    console.log(updatedDemandeData);
    const response = await api.createNewDemande(updatedDemandeData);
    // toast.success("Added Successfully"); 
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const getDemandesByUserThunk = async (user, thunkAPI) => {
  try {
    let response = await api.getAllDemandesByUser(user);

    const getDemandeFournisseur = (data) => {
      let children = [];
      const flattenDemandeFournisseur = data.map(demande => {
        // merge demande_summary of every fournisseur into one big list(children) 
        //so that the client sees only one facture or response (list)
        demande.list.map(m => {
          children = [...children, ...m.demande_summary];
          return m;
        });
        const c ={demande, list : children};
        children = [];
        return c;
        
      })
      return flattenDemandeFournisseur
    };

    const data = getDemandeFournisseur(response.data)
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const getDemandesThunk = async (user,thunkAPI) => {
  try {
    const response = await api.getAllDemandesByUser(user);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const updateDemandeThunk = async (updatedDemandeData, thunkAPI) => {
  try {
    const response = await api.updateDemande(updatedDemandeData);
    console.log(response.data)
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};

export const updateDemandeByClientThunk = async (updatedDemandeData, thunkAPI) => {
  try {
    const response = await api.updateDemandeByClient(updatedDemandeData);
    console.log(response.data)
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data || err);
  }
};
