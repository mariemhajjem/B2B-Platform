import { Navigate, Route, Routes } from 'react-router-dom'; 
import SignUp from "../pages/Auth/SignUp";
import SignIn from "../pages/Auth/SignIn";
import ProductItemDetails from '../pages/Home/ProductItemDetails';

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="sign-up/:role" exact element={<SignUp />} />
            <Route path="sign-in" exact element={<SignIn />} /> 
            <Route path="details/:id" exact element={<ProductItemDetails />} /> 
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};