import Axios from "axios";

let baseUrl = "http://localhost:5000/api/auth";

export const register = async (user) => {
  try {
    const result = await Axios.post(baseUrl + "/register", user);
    if (result.data?.token!== undefined ) localStorage.setItem("token", result.data?.token);
    return result.data.user;
  } catch (error) {
    console.log(error)
    console.log(error.response?.data)
  }
}; 

export const login = async (user) => {
  try {
    const result = await Axios.post(baseUrl + "/login", user);
    localStorage.setItem("token", JSON.stringify(result.data.token));
    // localStorage.setItem("token", result.data.token);
    return result.data;
  } catch (error) {
    throw error;
  }
};