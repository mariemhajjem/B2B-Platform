import React from 'react';
import { Card, Divider, InputNumber, Space, Table, Typography } from 'antd';

import { Button, Row } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity, removeItem, clearDevis } from '../../redux/reducers/devisSlice';
import { createDemande } from '../../redux/reducers/demande';
// import "./styles.css"
const { Title } = Typography;

export default function DemandeDevis() {
	const { cart } = useSelector((state) => state.demandesDevis);
	const user = useSelector((state) => state.auth.loggedUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const columns = [
		{
			title: 'Produit',
			dataIndex: 'product_label',
			key: 'Produit',
			render: (_, produit) => <Title level={5}>{produit.product_label}</Title>,
		},
		{
			title: 'quantité',
			dataIndex: 'quantity',
			key: 'quantity',
			render: (_, record) => <InputNumber min={1} max={record?.product_quantity}
				defaultValue={record.quantity} onChange={(quantity) => dispatch(changeQuantity({ _id: record._id, quantity }))} />
			,
		},
		{
			title: 'Prix/unité',
			dataIndex: 'product_price',
			key: 'prix',
			render: (_, produit) => <Title level={5}>{produit.product_price} DT</Title>,
		},
		{
			title: 'Sous-total',
			dataIndex: 'sous-total',
			key: 'sous-total',
			render: (_, record) => <Title level={5}>{record.quantity * record.product_price}</Title>,
		},
		{
			title: 'Supprimer',
			key: 'supprimer',
			render: (_, record) => (
				<Button danger onClick={() => dispatch(removeItem(record._id))}>Supprimer</Button>
			),
		},
	];
	const downloadPdf = (e) => {
		e.preventDefault();
		console.log(e)
		html2canvas(document.querySelector("#capture")).then((canvas) => {
			// if you want see your screenshot in body.
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF();
			pdf.addImage(imgData, "PNG", 0, 10);
			pdf.save("demande-devis.pdf");
		});
	};

	const sendDemande = () => {
		if (!user) navigate("/sign-in")
		try {
			let demande = {
				demande_summary: [],
				id: user.entrepriseClt?._id || user.entrepriseImport?._id
			}

			if (cart.length) {
				cart.map((prod) => demande.demande_summary.push({
					produit: prod._id,
					quantity: prod.quantity,
					price:prod.product_price,
					idFournisseur: prod.entrepriseImport
				}))

				dispatch(createDemande(demande))
				dispatch(clearDevis())

			}
			// navigate('/')

		} catch (error) {
			console.log(error)
		}
	}

	return (<>
		<Row style={{ justifyContent: "flex-end", margin: "3em 4em" }}>
			<Button
				className="but"
				type="primary"
				shape="round"
				icon={<DownloadOutlined />}
				onClick={downloadPdf}
			>
				Télécharger
			</Button></Row>
		
		<Space id="capture" wrap direction="vertical" size="middle" style={{ display: "flex", justifyContent: "center", margin: "0 10em" }}>
			<h1>Demande de devis</h1>
			<h2>{"Date : " + new Date().toLocaleDateString()}</h2>
			<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
				<Table pagination={false} columns={columns} dataSource={cart} style={{ width: "80%" }} />
				<Card style={{ height: "35%" }}>
					<Space direction="vertical">
						<Button type="primary" onClick={sendDemande}>Envoyer devis</Button>
						<Button>Discuter maintenant</Button>
					</Space>
				</Card>
			</div>

		</Space>
		<h3 style={{ padding: " 0 10em" }}> <Link to='/'>{`< Continuer mes achats`}</Link></h3>
	</>);
}
