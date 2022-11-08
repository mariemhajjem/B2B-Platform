import Axios from "axios";
import jwt_decode from "jwt-decode";


let baseUrl = "http://localhost:5000/api/auth";

export const register = async (user) => {
  try {
    const result = await Axios.post(baseUrl + "/register", user);
    if (result.data) localStorage.setItem("token", result.data);
    console.log("auth service register function: ",result.data)
    const loggedUser = jwt_decode(result.data);
    return loggedUser.user;
  } catch (error) {
    console.log(error)
    console.log(error.response?.data)
  }
}; 

export const login = async (user) => {
  try {
    const result = await Axios.post(baseUrl + "/login", user);
    localStorage.setItem("token", result.data); 
    
    const loggedUser = jwt_decode(result.data);
    console.log("auth service login function: ",loggedUser.user)
    return  loggedUser.user
  } catch (error) {
    console.log(error.response?.data)
  }
};