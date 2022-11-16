import Axios from "axios";

let baseUrl = "http://localhost:5000/api/users";
 
export const getAllUsers = async () => {
  return await Axios.get(baseUrl + "/"); 
}


export const createNewUser = async (user) => {
  return await Axios.post(baseUrl + "/", user); 
}

export const updateUser = async (user) => {
  return await Axios.put(baseUrl + "/", user); 
}

export const getUser = async (idUser) => {
  return await Axios.get(baseUrl + "/" + idUser); 
}

export const deleteUser = async (idUser) => {
  return await Axios.delete(baseUrl + "/" + idUser); 
}

export const blockUser = async (idUser) => {
  return await Axios.put(baseUrl + "/block" + idUser); 
}
