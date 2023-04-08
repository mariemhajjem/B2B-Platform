import {
	Row,
	Col,
	Card,
	Radio,
	Table,
	Button,
	Typography,
	Tag,
	Modal,
	Timeline,
	Popconfirm,
	Spin,
	Form,
	InputNumber,
	Input,
	message,
	Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllDemandes, getDemandes, getDemandesByUser, updateDemande, updateDemandeByClient } from "../../redux/reducers/demande";
import { CheckCircleTwoTone, ClockCircleTwoTone, CloseCircleTwoTone, EyeTwoTone, MenuUnfoldOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const project = [
	{
		title: "Entreprise",
		dataIndex: "name",
	},
	{
		title: "STATUT",
		dataIndex: "status",
	},
	{
		title: "DATE",
		dataIndex: "date",
	},
	{
		title: "ACTION",
		dataIndex: "action",
	},
];

const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

function Demandes() {
	const dispatch = useDispatch();
	const [reverse, setReverse] = useState(false);
	const [datasource, setData] = useState([]);
	const [demandesClient, setDemandesClient] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [demande, setDemande] = useState({ demande_address: [] });
	const { allDemandes, loading } = useSelector((state) => state.demande);
	const { role, entrepriseImport, entrepriseClt } = useSelector((state) => state.auth.loggedUser);
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm();
	const [editingKey, setEditingKey] = useState('');
	const TERMINATED = "Terminée";
	const CONFIRMEE = "Acceptée";
	const PARTCONFIRMEE = "Acceptée partiellement";
	const ENCOURS = "En cours";
	const REFUSEE = "Refusée";
	const color = {
		[ENCOURS]: "orange",
		[CONFIRMEE]: "green",
		[PARTCONFIRMEE]: "blue",
		[TERMINATED]: "gold",
		default: "red",
	}
	useEffect(() => {
		if (role === "ADMIN") {
			dispatch(getAllDemandes());
		} else if (role === "FOURNISSEUR") {
			console.log(role)
			dispatch(getDemandes({ idEntrepriseImport: entrepriseImport?._id }));
		} else if (role === "CLIENT") {
			dispatch(getDemandesByUser({ idEntrepriseClt: entrepriseClt?._id }));
		}
	}, []);

	const error = () => {
		messageApi.open({
			type: 'error',
			content: 'Négociation terminée par le fournisseur',
		});
	};

	const onChange = (e) => console.log(`radio checked:${e.target.value}`);
	const visible = () => setIsVisible(current => !current);

	const setVisible = (demande) => {
		if (demande?.demande_summary) {
			setData(demande?.demande_summary);
			setDemande(demande)
		}
		else {
			setData(demande?.list);
			setDemande(demande.demande)
		}

		visible()
	}

	const dataproject = !(role === "CLIENT") && !loading ? allDemandes?.map((demande, key) => ({
		key,
		name: (<Title level={5}>{demande.entrepriseClt?.company_name}</Title>),
		status: (<Tag color={color[demande?.demande_status] || color["default"]}>{demande?.demande_status || "-"}</Tag>),
		date: (<div className="ant-progress-project">{demande?.demande_date?.split('T')[0] || "-"}</div>),
		action: (<Popconfirm open={false} onOpenChange={() => setVisible(demande)}><EyeTwoTone /></Popconfirm >),
	})) : [];

	const data = (role === "CLIENT" && !loading) ? allDemandes?.map((demande, key) => ({
		key,
		name: (<Title level={5}>{demande.demande?.entrepriseClt?.company_name}</Title>),
		status: (<Tag color={color[demande?.demande?.demande_status] || color["default"]}>{demande?.demande?.demande_status || "-"}</Tag>),
		date: (<div className="ant-progress-project">{demande?.demande?.demande_date?.split('T')[0] || "-"}</div>),
		action: (<div>
			<Popconfirm open={false} onOpenChange={() => setVisible(demande)}><EyeTwoTone /></Popconfirm >
		</div>),
	})) : [];

	// const refuser = (id) => dispatch(updateDemande({ id, demande_status: REFUSEE }));
	const accept = (id) => dispatch(updateDemande({ id, demande_status: CONFIRMEE }));
	const refuseByClient = (id) => dispatch(updateDemandeByClient({ id, demande_status: TERMINATED }));
	const acceptByClient = (id) => dispatch(updateDemandeByClient({ id, demande_status: CONFIRMEE }));

	const isEditing = (record) => record.key === editingKey;
	const edit = (record) => {
		form.setFieldsValue({
			...record,
			price: record.price.props.children,
		});
		setEditingKey(record.key);
	};

	const cancel = () => {
		setEditingKey('');
	};

	const save = async (key) => {
		try {
			const row = await form.validateFields();
			console.log("row : ", row.price, key.produit.props.children)
			console.log(datasource)
			const demande_summary = datasource?.map((item) => {
				if (item.produit.product_label === key.produit.props.children && item.statut) {
					error();
					return item
				}
				else if (item.produit.product_label === key.produit.props.children)
					return ({ ...item, price: Number(row.price) })
				else return item
			}

			);

			setData(demande_summary);
			setEditingKey('');
			// replace object produit with _id produit to reduce size bz error 413 Request Entity Too Large
			const summary = demande_summary.map((value) => ({ ...value, produit: value.produit._id }))
			console.log("demande_summary" + demande_summary)
			!(role === "CLIENT") && dispatch(updateDemande({ id: demande._id, demande_summary: summary }))
				(role === "CLIENT") && dispatch(updateDemandeByClient({ id: demande._id, demande_summary: summary }))
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const columns = [
		{
			title: "Produit",
			dataIndex: "produit",
		},
		{
			title: "Quantité",
			dataIndex: "qty",
		},
		{
			title: "Statut",
			dataIndex: "status",
		},
		{
			title: "dernier prix",
			dataIndex: "price",
			editable: true,
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => save(record)}
							style={{
								marginRight: 8,
							}}
						>
							Enregistrer
						</Typography.Link>
						<Typography.Link onClick={cancel}>
							<a>Annuler</a>
						</Typography.Link>
					</span>
				) : (
					<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
						Modifier
					</Typography.Link>
				);
			},
		},
	];

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: col.dataIndex === 'price' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});
	const timelineList = (role === "CLIENT" && !loading) ? allDemandes?.map((demande, key) => ({
		title: `Demande #${demande?.demande?._id?.slice(-5)}`,
		time: demande?.demande?.demande_date?.split('T')[0] || "-",
		color: "green",
	})) : [];
	/* const timelineList = [
		{
			title: "$2,400 - Redesign store",
			time: "09 JUN 7:20 PM",
			color: "green",
		},
		{
			title: "New order #46282344",
			time: "14 MAY 3:30 PM",
			color: "gray",
		},
	]; */
	return (
		<>
			<>
				{contextHolder}
			</>
			<div className="tabled">
				<Row gutter={[24, 0]}>
					<Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">

						{!loading ? <Card
							bordered={false}
							className="criclebox tablespace mb-24"
							title="Tableau des demandes de devis clients"
							extra={
								<>
									<Radio.Group onChange={onChange} defaultValue="all">
										<Radio.Button value="online">Terminée</Radio.Button>
										<Radio.Button value="store">En cours</Radio.Button>
									</Radio.Group>
								</>
							}
						>
							<div className="table-responsive">
								<Table
									columns={project}
									dataSource={role === "CLIENT" ? data : dataproject}
									pagination={false}
									className="ant-border-space"
								/>
							</div>
						</Card> : <Spin size="large" />}
					</Col>
					{role === "CLIENT" && <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
						<Card bordered={false} className="criclebox h-full">
							<div className="timeline-box">
								<Title level={5}>Historique des demandes</Title>

								<Timeline
									className="timelinelist"
									reverse={reverse}
								>
									{timelineList.map((t, index) => (
										<Timeline.Item color={t.color} key={index}>
											<Title level={5}>{t.title}</Title>
											<Text>{t.time}</Text>
										</Timeline.Item>
									))}
								</Timeline>
								<Button
									type="primary"
									className="width-100"
									onClick={() => setReverse(!reverse)}
								>
									{<MenuUnfoldOutlined />} Inverser
								</Button>
							</div>
						</Card>
					</Col>}
				</Row>
			</div>
			<Modal
				title={"Détails demande"}
				open={isVisible}
				width={1000}
				footer={(role === "FOURNISSEUR") ? [/* 
					<Button key="refuse" type="primary" danger disabled={demande.demande_status === REFUSEE || demande.demande_status === CONFIRMEE}
						onClick={() => { refuser(demande?._id); setIsVisible(current => !current) }}>
						Refuser
					</Button>, */
					<Button key="submit" type="primary" disabled={demande.demande_status === REFUSEE || demande.demande_status === CONFIRMEE}
						onClick={() => { accept(demande._id); setIsVisible(current => !current) }}>
						Envoyer
					</Button>,

				] : [
					<Button key="refuse" type="primary" danger disabled={demande.demande_status === REFUSEE || demande.demande_status === TERMINATED}
						onClick={() => { refuseByClient(demande?._id); setIsVisible(current => !current) }}>
						Terminer
					</Button>,
					<Button key="submit" type="primary" disabled={demande.demande_status === REFUSEE}
						onClick={() => { acceptByClient(demande._id); setIsVisible(current => !current) }}>
						Accepter
					</Button>,

				]}
				onCancel={() => setIsVisible(current => !current)}
			>
				<Form form={form} component={false}>
					<Table
						components={{
							body: {
								cell: EditableCell,
							},
						}}
						bordered
						dataSource={datasource?.map((c, key) => ({
							key,
							produit: (<Title level={5}>{c.produit?.product_label}</Title>),
							qty: (<Title level={5}>{c.quantity}</Title>),
							price: (<Title level={5}>{c.price}</Title>),
							status: role === "CLIENT" ? (<Title level={5}>{c?.statut ? <CheckCircleTwoTone /> :
								demande?.demande_status === ENCOURS ? <ClockCircleTwoTone /> : <CloseCircleTwoTone twoToneColor="#eb2f96" />}</Title>) :
								(demande?.demande_status === ENCOURS ? <ClockCircleTwoTone /> :
									<Title level={5}>{c?.statut ? <CheckCircleTwoTone /> :
										<CloseCircleTwoTone twoToneColor="#eb2f96" />}</Title>),
						}))}
						columns={mergedColumns}
						pagination={false}
						rowClassName="editable-row"
					/>
				</Form>
			</Modal>

		</>
	);
}

export default Demandes;
