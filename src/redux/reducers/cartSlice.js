import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item._id === action.payload._id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, price: action.payload?.price, quantity: action.payload?.quantity || 1, key: action.payload._id });
        toast.success(`Vous avez ajouté ${action.payload.product_label} à votre commande`);
      }
    },
    changeQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload._id);
      item.quantity = action.payload.quantity || 1;
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item._id !== action.payload);
      state.cart = removeItem;
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});
export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  changeQuantity,
  removeItem,
  clearCart
} = cartSlice.actions;