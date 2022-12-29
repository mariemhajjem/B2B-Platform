import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux" 
import { PrivateRoutes, PublicRoutes } from "./"
import Home from "../pages/Home/Home";
import Cart from "../pages/Home/Cart";
import DemandeDevis from "../pages/Home/DemandeDevis"
import ProductItemDetails from '../pages/Home/ProductItemDetails';
import Produits from '../pages/Home/Produits';

export const AppRouter = () => {
    const user = useSelector((state) => state.auth.loggedUser) 
    return (
        <Routes>

            <Route path="/" exact element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/devis' element={<DemandeDevis />} />
            <Route path="produits/:category_id" exact element={<Produits />} />
            <Route path="details/:id" exact element={<ProductItemDetails />} />
            {
                user ?
                    <Route path="/*" element={<PrivateRoutes />} /> :
                    <Route path="/*" element={<PublicRoutes />} />
            }
            <Route path='*' element={<Navigate to='/' replace />} />

        </Routes>
    )
}