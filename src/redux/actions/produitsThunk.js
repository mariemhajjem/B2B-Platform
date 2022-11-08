import { isRejectedWithValue } from "@reduxjs/toolkit";
import * as api from "../../services/produit.service";

export const getAllProduitsThunk = async () => {

  try {
    const response = await api.getAllProduits();
    console.log(response)
    return response;
  } catch (err) {
    return isRejectedWithValue(err.response.data);
  }
};

export const createProduitThunk = async (updatedProduitData,{RejectWithValue}) => {
    try {
      console.log(updatedProduitData);
      const response = await api.createNewProduit(updatedProduitData);
      // toast.success("Added Successfully"); 
      return response;
    } catch (err) {
      return RejectWithValue(err.response.data);
    }
};


export const getProduitsByUserThunk = async (userId) => {
    try {
      const response = await api.getProduit(`/tour/userProduits/${userId}`);
      return response;
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
  };


export const updateProduitThunk = async ({ id, updatedProduitData, toast, navigate }) => {
    try {
      const response = await api.updateProduit(updatedProduitData);
      toast.success("Produit Updated Successfully");
      navigate("/dashboard");
      return response;
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
  };

export const deleteProduitThunk = async ({ id, toast }) => {
    try {
      const response = await api.deleteProduit(id);
      toast.success("Produit Deleted Successfully");
      return response;
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
};