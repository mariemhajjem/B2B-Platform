import Axios from "axios";

let baseUrl = "http://localhost:8000/api/reclamations";
 
export const getAllReclamations = async () => {
  return await Axios.get(baseUrl + "/"); 
}

export const getAllReclamationsByUser = async (user) => { 
  return await Axios.post(baseUrl + "/byuser", user);
}

export const createNewReclamation = async (reclamation) => {
  return await Axios.post(`${baseUrl}/add`, reclamation); 
} 

export const getReclamation = async (idReclamation) => {
  return await Axios.get(`${baseUrl}/${idReclamation}`); 
} 

export const deleteReclamation = async (idReclamation) => {
  return await Axios.delete(`${baseUrl}/${idReclamation}`); 
}
