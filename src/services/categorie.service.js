import Axios from "axios";

let baseUrl = "http://localhost:5000/api/categories";
 
export const getAllCategories = async () => {
  return await Axios.get(baseUrl + "/"); 
}


export const createNewCategorie = async (categorie) => {
  return await Axios.post(`${baseUrl}/add`, categorie); 
}

export const updateCategorie = async (categorie) => {
  return await Axios.put(`${baseUrl}/update`, categorie); 
}

export const getCategorie = async (idCategorie) => {
  return await Axios.get(`${baseUrl}/${idCategorie}`); 
}

export const deleteCategorie = async (idCategorie) => {
  return await Axios.delete(`${baseUrl}/${idCategorie}`); 
}
