import Axios from "axios";

let baseUrl = "http://localhost:5000/api/produits";
 
export const getAllProduits = async () => {
  try {
    const result = await Axios.get(baseUrl + "/");
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  }
}


export const createNewProduit = async (produit) => {
  try {
    console.log(produit);
    const result = await Axios.post(`${baseUrl}/`, produit);
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  }

}

export const updateProduit = async (produit) => {
  try {
    const result = await Axios.put(`${baseUrl}/`, produit);
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  }
}

export const getProduit = async (idProduit) => {
  try {
    const result = await Axios.get(`${baseUrl}/${idProduit}`);
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  }
}

export const deleteProduit = async (idProduit) => {
  try {
    const result = await Axios.delete(`${baseUrl}/${idProduit}`);
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  }
}
