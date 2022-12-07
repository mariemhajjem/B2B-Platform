import Axios from "axios"; 


const baseUrl = "http://localhost:5000/api/auth";

export const register = async (user) => {
  return await Axios.post(baseUrl + "/register", user); 
}; 

export const login = async (user) => {
  return await Axios.post(baseUrl + "/login", user); 
};

export const updateProfile = async (user) => {
  return await Axios.put(baseUrl + "/profile", user); 
};

export const resetPassword = async (user) => {
  return await Axios.put(baseUrl + "/resetPassword", user); 
};