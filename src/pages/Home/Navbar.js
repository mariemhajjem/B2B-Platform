import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { useTranslation } from "react-i18next";

import logo from "../../assets/images/SM-logo.jpg";
import i18n from "../../locales/i18n";
const { Header } = Layout; 
const centerStyle = {
  justifyContent: "center", 
  zIndex: 1,
  width: "100%",
  height: "10%",
};

const changeLanguage = (ln) => {
  return () => {
    i18n.changeLanguage(ln);
  };
};

function Navbar(props) {
  const { t } = useTranslation();
  //const history = useHistory();
  const logout = (e) => {
    // history.push("/home");
  };
  return (
    <Layout className="layout-default layout-signin">
     
        <Menu mode="horizontal" style={centerStyle}>
          <Menu.Item key="img">
            <h5>S&M</h5>
          </Menu.Item>

          <Menu.Item key="home">
            <Link to="/">
              <span>{t("Accueil")}</span>
            </Link>
          </Menu.Item>

          <Menu.Item href="#Faq" target="#Faq" key="FAQ">
            <a href="#Faq"> {t("FAQ")}</a>
          </Menu.Item>
          <Menu.Item key="4">
              <Link to="/sign-in">
                <span>{t("Se connecter")}</span>
              </Link>
            </Menu.Item>
          <Menu.Item key="Contact">
            <a href="#Contact">{t("Contactez-nous")}</a>
          </Menu.Item>
          <Menu.Item key="signup">
          <div className="header-col header-btn">
            <Button type="false">
              <Link to="/sign-up">
                <span>{t("S'inscrire")}</span>
              </Link></Button></div>
          </Menu.Item>
          <Menu.Item key="translation">
            <Button shape="circle" onClick={changeLanguage("fr")}>
              fr
            </Button>
            <Button shape="circle" onClick={changeLanguage("ar")}>
              ar
            </Button>
          </Menu.Item>
        </Menu>  
      <Outlet />
    </Layout>
  );
}
export default Navbar;
