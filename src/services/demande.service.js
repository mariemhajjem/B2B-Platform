import Axios from "axios";

let baseUrl = "http://localhost:5000/api/demandes";
 
export const getAllDemandes = async () => {
  return await Axios.get(baseUrl + "/"); 
}

export const getAllDemandesByUser = async (user) => { 
  return await Axios.post(baseUrl + "/byuser", user);
}

export const createNewDemande = async (demande) => {
  return await Axios.post(`${baseUrl}/add`, demande); 
} 

export const getDemande = async (idDemande) => {
  return await Axios.get(`${baseUrl}/${idDemande}`); 
} 

export const updateDemande = async (demande) => {
  return await Axios.put(`${baseUrl}/updatebyfournisseur`, demande); 
}

export const updateDemandeByClient = async (demande) => {
  return await Axios.put(`${baseUrl}/updatebyclient`, demande); 
}
