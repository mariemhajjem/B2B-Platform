import React, { lazy, Suspense } from "react"; 
import { Navigate, Route, Routes } from 'react-router-dom';

const Main = lazy(() => import("../components/layout/Main"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));
const Demandes = lazy(() => import("../pages/Admin/Demandes"));
const Clients = lazy(() => import("../pages/Admin/Clients"));
const Stock = lazy(() => import("../pages/Admin/Stock"));
const Reclamations = lazy(() => import("../pages/Admin/Reclamations"));
const Commandes = lazy(() => import("../pages/Admin/Commandes"));
const Categories = lazy(() => import("../pages/Admin/Categories"));
const Profile = lazy(() => import("../pages/Admin/Profile"));
const Chatpage = lazy(() => import("../pages/Admin/chat"));


const Loading = ({ node }) => {
    return (<Suspense fallback={<div>Loading...</div>}>{node}</Suspense>)
}

export const PrivateRoutes = () => { 
    return (
        <Routes>
            <Route path="/dashboard" element={<Loading node={<Main />} />}>
                <Route index element={<Loading node={<Dashboard />} />} />
                <Route path="demandes" exact element={<Loading node={<Demandes />} />} />
                <Route path="stock" exact element={<Loading node={<Stock />} />} />
                <Route path="reclamations" exact element={<Loading node={<Reclamations />} />} />
                <Route path="clients" exact element={<Loading node={<Clients />} />} />
                <Route path="commandes" element={<Loading node={<Commandes />} />} />
                <Route path="category" element={<Loading node={<Categories />} />} />
                <Route path="profile" element={<Loading node={<Profile />} />} />
                
            </Route>
            <Route path="/chats" element={<Loading node={<Chatpage />} />} />
            <Route path='*' element={<Navigate to='/dashboard' replace />} />
        </Routes>
    );
};