import * as api from "../../services/users.service.js"; 

export const getAllUsersThunk = async (thunkAPI) => {
    try {
        const result = await api.getAllUsers();
        return result.data;
    } catch (error) {
        console.log(error.response?.data);
        return thunkAPI.rejectWithValue(error?.response?.data || error);
    }
}

export const getAllUsersByRoleThunk = async (user,thunkAPI) => {
    try {
        const result = await api.getAllUsersByFournisseur(user);
        return result.data;
    } catch (error) {
        console.log(error.response?.data);
        return thunkAPI.rejectWithValue(error?.response?.data || error);
    }
}

export const getEntrepriseThunk = async (user,thunkAPI) => {
    try {
        const result = await api.getEntreprise(user);
        if (result.data.length) return result.data[0];
        else return result.data;
    } catch (error) {
        console.log(error.response?.data);
        return thunkAPI.rejectWithValue(error?.response?.data || error);
    }
}


export const createNewUserThunk = async (user, thunkAPI) => {
    try {
        const result = await api.createNewUser(user);
        return result.data;
    } catch (error) {
        console.log(error.response?.data)
        return thunkAPI.rejectWithValue(error?.response?.data || error);
    }

}

export const updateUserThunk = async (user, thunkAPI) => {
    try {
        const result = await api.updateUser(user);
        return result.data;
    } catch (error) {
        console.log(error.response?.data);
        return thunkAPI.rejectWithValue(error?.response?.data || error);
    }
}

export const getUserThunk = async (idUser, thunkAPI) => {
    try {
        const result = await api.getUser(idUser);
        return result.data;
    } catch (error) {
        console.log(error.response?.data);
        return thunkAPI.rejectWithValue(error?.response?.data || error);
    }
}

export const getUserByNameThunk = async (name, thunkAPI) => {
    try {
        const result = await api.getUserByName(name);
        return result.data;
    } catch (error) {
        console.log(error.response?.data);
        return thunkAPI.rejectWithValue(error?.response?.data || error);
    }
}

export const deleteUserThunk = async (idUser, thunkAPI) => {
    try {
        const result = await api.deleteUser(idUser);
        return result.data;
    } catch (error) {
        console.log(error.response?.data);
        return thunkAPI.rejectWithValue(error?.response?.data || error);
    }
}
export const blockUserThunk = async (idUser, thunkAPI) => {
    try {
        const result = await api.blockUser(idUser);
        return result.data;
    } catch (error) {
        console.log(error.response?.data);
        return thunkAPI.rejectWithValue(error?.response?.data || error);
    }
}