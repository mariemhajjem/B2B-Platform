import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'
import auth from "./auth";
import users from "./users";
import produits from "./produits"; 
import categories from "./categories";
import commande from "./commande";
import demande from "./demande";
import reclamation from "./reclamation";
import { cartReducer } from "./cartSlice";
import { devisReducer } from "./devisSlice";

const persistConfig = {
    key: 'root',
    storage,
}
const persistDevisConfig = {
    key: 'devis',
    storage,
}
const persistedReducer = persistReducer(persistConfig, cartReducer)
const demandesDevis = persistReducer(persistDevisConfig, devisReducer)
export default () => ({
    auth,
    users, 
    produits,
    categories,
    persistedReducer,
    demandesDevis,
    commande,
    demande,
    reclamation
});
