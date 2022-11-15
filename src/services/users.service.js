import Axios from "axios";

let baseUrl = "http://localhost:5000/api/employees";
 
export const getAllUsers = async () => {
  return await Axios.get(baseUrl + "/");
  try {
    const result = await Axios.get(baseUrl + "/");
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  }
}


export const createNewUser = async (user) => {
  return await Axios.post(baseUrl + "/", user);
  try {
    const result = await Axios.post(baseUrl + "/", user);
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  }

}

export const updateUser = async (user) => {
  return await Axios.put(baseUrl + "/", user);
  try {
    const result = await Axios.put(baseUrl + "/", user);
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  }
}

export const getUser = async (idUser) => {
  return await Axios.get(baseUrl + "/" + idUser);
  try {
    const result = await Axios.get(baseUrl + "/" + idUser);
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  }
}

export const deleteUser = async (idUser) => {
  return await Axios.delete(baseUrl + "/" + idUser);
  try {
    const result = await Axios.delete(baseUrl + "/" + idUser);
    return result.data;
  } catch (error) {
    console.log(error.response?.data)
  }
}
