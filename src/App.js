import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Demandes from "./pages/Admin/Demandes"; 
import Clients from "./pages/Admin/Clients";
import Stock from "./pages/Admin/Stock";
import Reclamations from "./pages/Admin/Reclamations";
import Commandes from "./pages/Admin/Commandes";
import Profile from "./pages/Admin/Profile";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Dashboard from "./pages/Admin/Dashboard";
import Navbar from "./pages/Home/Navbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="sign-up" exact element={<SignUp />} />
        <Route path="sign-in" exact element={<SignIn />} />
      </Route>
      <Route path="/dashboard" element={<Main />}>
        <Route index element={<Dashboard />} />
        <Route path="demandes" exact element={<Demandes />} />
        <Route path="stock" exact element={<Stock />} />
        <Route path="reclamations" exact element={<Reclamations />} />
        <Route path="clients" exact element={<Clients />} /> 
        <Route path="commandes" element={<Commandes />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navbar />} />
      {/* <Route
            path="/dashboard"
            render={(props) =>
              localStorage.getItem("token") ? (
                <Home />
              ) : (
                <Redirect to="/" />
              )
            }
          ></Route> */}
    </Routes>
  );
}

export default App;
