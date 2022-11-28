import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'
import auth from "./auth";
import users from "./users";
import produits from "./produits"; 
import categories from "./categories";
import commande from "./commande";
import { cartReducer } from "./cartSlice";

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, cartReducer)
export default () => ({
    auth,
    users, 
    produits,
    categories,
    persistedReducer,
    commande
});
