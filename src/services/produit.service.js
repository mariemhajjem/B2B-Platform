import Axios from "axios";

let baseUrl = "http://localhost:5000/api/produits";
 
export const getAllProduits = async () => {
  return await Axios.get(baseUrl + "/"); 
}

export const getAllProduitsByUser = async (user) => {
  console.log(user)
  return await Axios.get(baseUrl + "/byuser", user);
}

export const createNewProduit = async (produit) => {
  return await Axios.post(`${baseUrl}/add`, produit);
  /* const config = {     
      headers: { 'content-type': 'multipart/form-data' }
  }
  try {
    console.log(produit);
    const result = await Axios.post(`${baseUrl}/add`, produit ,config );
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  } */
}

export const updateProduit = async (produit) => {
  return await Axios.put(`${baseUrl}/update`, produit); 
}

export const getProduit = async (idProduit) => {
  return await Axios.get(`${baseUrl}/${idProduit}`); 
}

export const deleteProduit = async (idProduit) => {
  return await Axios.delete(`${baseUrl}/${idProduit}`); 
}
