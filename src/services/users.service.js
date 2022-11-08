import Axios from "axios";

let baseUrl = "http://localhost:5000/api/employees";
 
export const getAllUsers = async () => {
  try {
    const result = await Axios.get(baseUrl + "/");
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  }
}


export const createNewUser = async (user) => {
  try {
    const result = await Axios.post(baseUrl + "/", user);
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  }

}

export const updateUser = async (user) => {
  try {
    const result = await Axios.put(baseUrl + "/", user);
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  }
}

export const getUser = async (idUser) => {
  try {
    const result = await Axios.get(baseUrl + "/" + idUser);
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  }
}

export const deleteUser = async (idUser) => {
  try {
    const result = await Axios.delete(baseUrl + "/" + idUser);
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  }
}
