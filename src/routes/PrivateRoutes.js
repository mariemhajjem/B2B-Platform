import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from 'react-router-dom';

const Main = lazy(() => import("../components/layout/Main"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));
const Demandes = lazy(() => import("../pages/Admin/Demandes"));
const Clients = lazy(() => import("../pages/Admin/Clients"));
const Stock = lazy(() => import("../pages/Admin/Stock"));
const Reclamations = lazy(() => import("../pages/Admin/Reclamations"));
const Commandes = lazy(() => import("../pages/Admin/Commandes"));
const Profile = lazy(() => import("../pages/Admin/Profile"));


const Loading = ({ node }) => {
    return (<Suspense fallback={<div>Loading... </div>}>{node}</Suspense>)
}

export const PrivateRoutes = () => {
    const { role,firstName}  = useSelector((state) => state.auth.loggedUser.result)
    let route;
    let roled = 'admin';
    return (
        <Routes>
            {/* {
                    role === 'admin'
                        ? <Route path="/*" element={<PrivateRoutes />} />
                        : <Route path="/*" element={<PublicRoutes />} />
            }}
            {
                (() => {
                    switch (role) {
                        case "admin": route =  <Route index element={<Loading node={<Dashboard />} />} />;
                        
                        return route;
                        case "green": return "#00FF00";
                        case "blue": return "#0000FF";
                        default: return "#FFFFFF";
                    }
                })()
             */}
            <Route path="/dashboard" element={<Loading node={<Main />} />}>
                <Route index element={<Loading node={<Dashboard />} />} />
                <Route path="demandes" exact element={<Loading node={<Demandes />} />} />
                <Route path="stock" exact element={<Loading node={<Stock />} />} />
                <Route path="reclamations" exact element={<Loading node={<Reclamations />} />} />
                <Route path="clients" exact element={role === 'admin' && <Loading node={<Clients />} />} />
                <Route path="commandes" element={<Loading node={<Commandes />} />} />
                <Route path="profile" element={<Loading node={<Profile />} />} />
            </Route>

            <Route path='*' element={<Navigate to='/dashboard' replace />} />
        </Routes>
    );
};