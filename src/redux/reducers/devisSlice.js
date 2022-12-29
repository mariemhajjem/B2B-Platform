import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const devisSlice = createSlice({
    name: 'devis',
    initialState: {
        cart: [],
    },
    reducers: {
        addToDevis: (state, action) => {
            const itemInCart = state.cart.find((item) => item._id === action.payload._id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: action.payload?.quantity || 1, key: action.payload._id });
                toast.success(`Vous avez ajouté ${action.payload.product_label} à votre demande`);
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
        clearDevis: (state, action) => {
            state.cart = [];
        },
        addDevis: (state, action) => {
            const newCart = [...state.cart, ...action.payload];
            state.cart = [...new Set(newCart)]
        },
    },
});
export const devisReducer = devisSlice.reducer;
export const {
    addDevis,
    addToDevis,
    changeQuantity,
    removeItem,
    clearDevis
} = devisSlice.actions;