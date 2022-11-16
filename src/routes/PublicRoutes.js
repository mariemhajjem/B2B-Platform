import { Navigate, Route, Routes } from 'react-router-dom'; 
import SignUp from "../pages/Auth/SignUp";
import SignIn from "../pages/Auth/SignIn";
import ProduitDetails from '../pages/Home/ProduitDetails';

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="sign-up/:role" exact element={<SignUp />} />
            <Route path="sign-in" exact element={<SignIn />} /> 
            <Route path="details" exact element={<ProduitDetails />} /> 
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};