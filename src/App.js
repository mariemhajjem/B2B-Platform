import React, { lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";      
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css"; 
import Navbar from "./pages/Home/Navbar";

const Main = lazy(() => import("./components/layout/Main"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const Demandes = lazy(() => import("./pages/Admin/Demandes"));
const Clients = lazy(() => import("./pages/Admin/Clients"));
const Stock = lazy(() => import("./pages/Admin/Stock"));
const Reclamations = lazy(() => import("./pages/Admin/Reclamations"));
const Commandes = lazy(() => import("./pages/Admin/Commandes"));
const Profile = lazy(() => import("./pages/Admin/Profile"));

const Loading = ({node}) => {
  return(<Suspense fallback={<div>Loading... </div>}>{node}</Suspense>)
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="sign-up" exact element={<SignUp />} />
        <Route path="sign-in" exact element={<SignIn />} />
      </Route>
      
        <Route path="/dashboard" element={<Loading node={<Main />} />}>
          <Route index element={<Loading node={<Dashboard />} />} />
          <Route path="demandes" exact element={<Loading node={<Demandes />} />} />
          <Route path="stock" exact element={<Loading node={<Stock />} />} />
          <Route path="reclamations" exact element={<Loading node={<Reclamations />} />} />
          <Route path="clients" exact element={<Loading node={<Clients />} /> }/>
          <Route path="commandes" element={<Loading node={<Commandes />} />} />
          <Route path="profile" element={<Loading node={<Profile />} />} />
        </Route>
    </Routes>
  );
}

export default App;
