import Axios from "axios";

let baseUrl = "http://localhost:5000/api/categories";
 
export const getAllCategories = async () => {
  return await Axios.get(baseUrl + "/"); 
}


export const createNewCategorie = async (produit) => {
  return await Axios.post(`${baseUrl}/add`, produit); 
}

export const updateCategorie = async (produit) => {
  return await Axios.put(`${baseUrl}/update`, produit); 
}

export const getCategorie = async (idCategorie) => {
  return await Axios.get(`${baseUrl}/${idCategorie}`); 
}

export const deleteCategorie = async (idCategorie) => {
  return await Axios.delete(`${baseUrl}/${idCategorie}`); 
}
