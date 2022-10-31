import { Navigate, Route, Routes } from 'react-router-dom'; 
import SignUp from "../pages/Auth/SignUp";
import SignIn from "../pages/Auth/SignIn";

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="sign-up" exact element={<SignUp />} />
            <Route path="sign-in" exact element={<SignIn />} /> 
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};