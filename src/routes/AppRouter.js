import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux" 
import { PrivateRoutes, PublicRoutes } from "./"
import Home from "../pages/Home";
import { useEffect } from "react";

const Status = ['checking' , 'authenticated' , 'no-authenticated']

let status = 'no-authenticated'

export const AppRouter = () => {
    const { role,firstName}  = useSelector((state) => state.auth.loggedUser.result)
    // const token = useSelector(selectCurrentToken) 

    useEffect(() => {
        console.log(role,firstName);
    },[])
    if (status === 'checking') return <div className="loading">Checking credentials...</div>

    return ( 
            <Routes>
                <Route path="/" exact element={<Home />} />
                {
                    status === 'authenticated'
                        ? <Route path="/*" element={<PrivateRoutes />} />
                        : <Route path="/*" element={<PublicRoutes />} />
                }

                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes> 
    )
}