import { Menu, Image } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import "./Navbar.css";
import logo from "../../assets/images/user-circle.svg";
import { logout as Logout } from "../../redux/reducers/auth";
import { PostAdd, ShoppingCart } from '@mui/icons-material';
const { SubMenu } = Menu;
const centerStyle = {
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  zIndex: 2,
  width: "100%",
  height: "10%",
};
const changeLanguage = (ln) => {
  return () => {
    // i18n.changeLanguage(ln);
  };
};

function Navbar() {
  const token = useSelector((state) => state.auth.loggedUser);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const CLIENT = "CLIENT";
  const FOURNISSEUR = "FOURNISSEUR"
  const logout = (e) => {
    dispatch(Logout());
  };
  return (
    <div className="header">
      <Menu mode="horizontal" style={centerStyle}>
        <Menu.Item key="img">
          <Image src={logo} className="logos" />
        </Menu.Item>

        <Menu.Item key="home">
          <Link to="/Home">{t("Welcome")}</Link>
        </Menu.Item>


        <Menu.Item href="#Faq" target="#Faq" key="FAQ">
          <a href="#Faq"> {t("FAQ")}</a>
        </Menu.Item>

        <Menu.Item key="Contact">
          <a href="#Contact">{t("Contactez-nous")}</a>
        </Menu.Item>
        {!token && <SubMenu key="Inscription" title={t("Inscription")}>
          <Menu.Item key="inscriC">
            <Link to={`/sign-up/${FOURNISSEUR}`}>
              {t("Fournisseur")}
            </Link>
          </Menu.Item>
          <Menu.Item key="inscriP">
            <Link to={`/sign-up/${CLIENT}`}>
              {t("Client")}
            </Link>
          </Menu.Item>
        </SubMenu>}
        {token ? (<Menu.Item key="dashboard">
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>) : null}
        {token ? (
          <Menu.Item key="logout" onClick={logout}>
            Logout
          </Menu.Item>
        ) : <Menu.Item key="dashboard">
          <Link to="/sign-in">
            <span>{t("Se connecter")}</span>
          </Link>
        </Menu.Item>
        }
        <Menu.Item>
          <Link to="/devis">
            <PostAdd />Devis
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link to="/cart">
            <ShoppingCart />
          </Link>
        </Menu.Item>
        <Menu.Item key="translation">
          {/* <Button shape="circle" onClick={changeLanguage("fr")}>
            fr
          </Button>
          <Button shape="circle" onClick={changeLanguage("en")}>
            en
          </Button>
          <Button shape="circle" onClick={changeLanguage("ar")}>
            ar
          </Button> */}
        </Menu.Item>

      </Menu>
    </div>
  );
}
export default Navbar;
