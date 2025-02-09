import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Image, Badge } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
import logo from "../../assets/images/user-circle.svg";
import { logout as Logout } from "../../redux/reducers/auth";
import { getAllCategories } from "../../redux/reducers/categories";
import { FileDoneOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const centerStyle = {
	alignItems: "flex-end",
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
	const { cart } = useSelector((state) => state.persistedReducer);
	const { cart : devis } = useSelector((state) => state.demandesDevis);
	const [categories, setCategories] = useState([]);
	const [childrenCategories, setChildrenCategories] = useState([]);
	const [category, setCategory] = useState('');
	const [total, setTotal] = useState(0);
	const [show, setShow] = useState(devis.length > 0);
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const CLIENT = "CLIENT";
	const FOURNISSEUR = "FOURNISSEUR";
	const ADMIN = "ADMIN"

	useEffect(() =>{
		dispatch(getAllCategories())
	}, [])
	useEffect(() => {
		const categoriesTab = allCategories.map((categorie) => ({
			label: <Link to={`/category/${category}`}>
				{categorie.category_name}
			</Link>, key: categorie._id
		}));
		setCategories(categoriesTab)
		const getTotalQuantity = () => {
			let total = 0
			cart?.forEach(item => {
				total += item.quantity
			})
			return total
		} 
		setTotal(getTotalQuantity())
		const children = allCategories.map((category,key) => ({
			label:
				<Link to={`/produits/${category._id}`}>
					{category.category_name}
				</Link>,
			key
		}))
		setChildrenCategories(children)
	}, [loading, cart, total])

	const logout = (e) => {
		dispatch(Logout());
	};


	const items = [
		{ label: <Image src={logo} className="logos" />, key: 'item-1' },
		{ label: <Link to="/">{t("Accueil")}</Link>, key: 'item-2' },
		{
			label: <Link to="/">{t("Catégories")}</Link>, key: 'item-6',
			children: childrenCategories,
		},
		{ label: <a href="#Produits">{t("Produits")}</a>, key: 'item-3' },
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
		token ? token?.role == ADMIN ? { label: <Link to="/dashboard/clients">Dashboard</Link>, key: 'item-8' } : { label: <Link to="/dashboard">Dashboard</Link>, key: 'item-8' }: null,
		token ? null : {
			label:
				<Link to="/sign-in">
					<span>{t("Se connecter")}</span>
				</Link>, key: 'item-9'
		},
		(token?.role==CLIENT) && {
			label: <Link to="/devis">
				<Badge dot={show}>
				<FileDoneOutlined />Devis</Badge>
			</Link>, key: 'item-d'
		},
		(token?.role==CLIENT) && {
			label: <Link to="/cart">
				<Badge size="small" count={total}>
				<ShoppingCartOutlined /> </Badge>
			</Link>, key: 'item-c'
		},
	];
	return (
		<Menu items={items} mode="horizontal" style={centerStyle} />
	);
}
export default Navbar;
