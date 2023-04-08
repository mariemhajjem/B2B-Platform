import Axios from "axios";

let baseUrl = "http://localhost:8000/api/commandes";
 
export const getAllCommandes = async () => {
  return await Axios.get(baseUrl + "/"); 
}

export const getAllCommandesByUser = async (user) => { 
  return await Axios.post(baseUrl + "/byuser", user);
}

export const createNewCommande = async (commande) => {
  return await Axios.post(`${baseUrl}/add`, commande); 
} 

export const getCommande = async (idCommande) => {
  return await Axios.get(`${baseUrl}/${idCommande}`); 
} 

export const updateCommande = async (commande) => {
  return await Axios.put(`${baseUrl}/update`, commande); 
}
