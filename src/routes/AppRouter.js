import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { PrivateRoutes, PublicRoutes } from "./"
import Home from "../pages/Home"; 

export const AppRouter = () => {
    const user = useSelector((state) => state.auth.loggedUser)   

    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            {
                user?
                <Route path="/*" element={<PrivateRoutes />} />: 
                <Route path="/*" element={<PublicRoutes />} />
            }

            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    )
}