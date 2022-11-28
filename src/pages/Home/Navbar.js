import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Image } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PostAdd, ShoppingCart } from '@mui/icons-material';
import "./Navbar.css";
import logo from "../../assets/images/user-circle.svg";
import { logout as Logout } from "../../redux/reducers/auth";

import { getAllCategories } from "../../redux/reducers/categories";
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
	const { allCategories, loading } = useSelector((state) => state.categories);
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState('');
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const CLIENT = "CLIENT";
	const FOURNISSEUR = "FOURNISSEUR";
	useEffect(() => { 
		const categoriesTab = allCategories.map((categorie) => ({
			label: <Link to={`/category/${category}`}>
				{categorie.category_name}
			</Link>, key: categorie._id
		})); 
		setCategories(categoriesTab) 
		
	}, [loading])

	const logout = (e) => {
		dispatch(Logout());
	};

	const items = [
		{ label: <Image src={logo} className="logos" />, key: 'item-1' },
		{ label: <Link to="/">{t("Accueil")}</Link>, key: 'item-2' },
		{
			label: <Link to="/">{t("Catégories")}</Link>, key: 'item-6',
			children: categories,
		},
		{ label: <Link to="/">{t("Produits")}</Link>, key: 'item-3' },
		{ label: <a href="#Contact">{t("Contactez-nous")}</a>, key: 'item-4' },
		{ label: <a href="#Faq"> {t("FAQ")}</a>, key: 'item-5' },
		!token && {
			label: 'Inscription',
			key: 'submenu',
			children: [{
				label:
					<Link to={`/sign-up/${FOURNISSEUR}`}>
						{t("Fournisseur")}
					</Link>,
				key: 'submenu-item-1'
			},
			{
				label:
					<Link to={`/sign-up/${CLIENT}`}>
						{t("Client")}
					</Link>,
				key: 'submenu-item-2'
			}],
		},
		token ? { label: <Link to="/dashboard">Dashboard</Link>, key: 'item-8' } : null,
		token ? { label: "Logout", onClick: logout, key: 'item-7' } : {
			label:
				<Link to="/sign-in">
					<span>{t("Se connecter")}</span>
				</Link>, key: 'item-9'
		},
		{
			label: <Link to="/devis">
				<PostAdd />Devis
			</Link>, key: 'item-d'
		},
		{
			label: <Link to="/cart">
				<ShoppingCart />
			</Link>, key: 'item-c'
		},
	];
	return (
		<Menu items={items} mode="horizontal" style={centerStyle} />
	);
}
export default Navbar;
