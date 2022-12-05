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
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCommandes, getCommandes, getCommandesByUser, updateCommande } from "../../redux/reducers/commande";
import { CheckCircleTwoTone, ClockCircleTwoTone, CloseCircleTwoTone, EyeTwoTone, MenuUnfoldOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
// project table start
const project = [
  {
    title: "Entreprise",
    dataIndex: "name",
  },
  {
    title: "TOTAL",
    dataIndex: "total",
  },
  {
    title: "STATUS",
    dataIndex: "status",
  },
  {
    title: "DATE",
    dataIndex: "date",
  },
  {
    title: "ADRESSE",
    dataIndex: "address",
  },
  {
    title: "ACTION",
    dataIndex: "action",
  },
];


function Commandes() {
  const dispatch = useDispatch();
  const [reverse, setReverse] = useState(false);
  const [datasource, setData] = useState([]);
  const [commandesClient, setCommandesClient] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [commande, setCommande] = useState({ commande_address: [] });
  const { allCommandes, loading } = useSelector((state) => state.commande);
  const { role, entrepriseImport, entrepriseClt } = useSelector((state) => state.auth.loggedUser);
  const CONFIRMEE = "Confirmée";
  const PARTCONFIRMEE = "Confirmée partiellement";
  const ENCOURS = "En cours";
  const REFUSEE = "Refusée";

  useEffect(() => {
    if (role === "ADMIN") {
      dispatch(getAllCommandes());
    } else if (entrepriseImport?._id) {
      dispatch(getCommandes({ idEntrepriseImport: entrepriseImport?._id }));
    } else {
      dispatch(getCommandesByUser({ idEntrepriseClt: entrepriseClt?._id }));
    }
  }, []);

  const getColor = (status) => {
    switch (status) {
      case ENCOURS: return "orange";
      case CONFIRMEE: return "green";
      case PARTCONFIRMEE: return "blue";
      default: return "red";
    }
  }

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const refuser = (id) => dispatch(updateCommande({ id, commande_status: REFUSEE }));
  const accept = (id) => dispatch(updateCommande({ id, commande_status: CONFIRMEE }))

  const setVisible = (commande) => {
    if (commande?.commande_summary) {
      setData(commande?.commande_summary);
      setCommande(commande)
    }
    else {
      setData(commande?.list);
      setCommande(commande.commande)
    }
    setIsVisible(current => !current)

  }

  const dataproject = !(role === "CLIENT") && !loading ? allCommandes?.map((commande, key) => ({
    key,
    name: (<Title level={5}>{commande.entrepriseClt?.company_name}</Title>),
    total: (<div className="semibold">{commande?.total || "-"}</div>),
    status: (<Tag color={getColor(commande?.commande_status)}>{commande?.commande_status || "-"}</Tag>),
    date: (<div className="ant-progress-project">{commande?.commande_date?.split('T')[0] || "-"}</div>),
    address: (<div className="text-sm">{commande?.commande_address[0]?.address + ", " + commande?.commande_address[0]?.code_postal}</div>),
    action: (<div>
      <Button onClick={() => setVisible(commande)}><EyeTwoTone /></Button>
      { commande?.commande_status==='En cours' && <Button onClick={() => refuser(commande?._id)}><CloseCircleTwoTone twoToneColor="#eb2f96" /></Button> }
    </div>),
  })) : [];
  const data = (role === "CLIENT" && !loading) ? allCommandes?.map((commande, key) => ({
    key,
    name: (<Title level={5}>{commande.commande?.entrepriseClt?.company_name}</Title>),
    total: (<div className="semibold">{commande?.commande?.total || "-"}</div>),
    status: (<Tag color={getColor(commande?.commande?.commande_status)}>{commande?.commande?.commande_status || "-"}</Tag>),
    date: (<div className="ant-progress-project">{commande?.commande?.commande_date?.split('T')[0] || "-"}</div>),
    address: (<div className="text-sm">{commande?.commande?.commande_address[0]?.address + ", " + commande?.commande?.commande_address[0]?.code_postal}</div>),
    action: (<div>
      <Button onClick={() => setVisible(commande)}><EyeTwoTone /></Button>
    </div>),
  })) : [];

  const timelineList = [
    {
      title: "$2,400 - Redesign store",
      time: "09 JUN 7:20 PM",
      color: "green",
    },
    {
      title: "New order #3654323",
      time: "08 JUN 12:20 PM",
      color: "green",
    },
    {
      title: "Company server payments",
      time: "04 JUN 3:10 PM",
    },
    {
      title: "New card added for order #4826321",
      time: "02 JUN 2:45 PM",
    },
    {
      title: "Unlock folders for development",
      time: "18 MAY 1:30 PM",
    },
    {
      title: "New order #46282344",
      time: "14 MAY 3:30 PM",
      color: "gray",
    },
  ];
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">

            {!loading? <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Tableau des commandes clients"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="all">
                    <Radio.Button value="all">Tous</Radio.Button>
                    <Radio.Button value="online">Confirmée</Radio.Button>
                    <Radio.Button value="store">En cours</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
               <div className="table-responsive">
                <Table
                  columns={project}
                  dataSource={role == "CLIENT" ? data : dataproject}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>: "chargement..."}
          </Col>
          {role == "CLIENT" && <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5}>Orders History</Title>
                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                  this month <span className="bnb2">20%</span>
                </Paragraph>

                <Timeline
                  pending="Recording..."
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
                  {<MenuUnfoldOutlined />} REVERSE
                </Button>
              </div>
            </Card>
          </Col>}
        </Row>
      </div>

      <Modal
        title={"Détails commande"}
        open={isVisible}
        footer={(role === "FOURNISSEUR") && [
          <Button key="submit" type="primary" disabled={commande.commande_status === REFUSEE || commande.commande_status === CONFIRMEE} onClick={() => {accept(commande._id);setIsVisible(current => !current)}}>
            Accepter
          </Button>
        ]}
        onCancel={() => setIsVisible(current => !current)}
      >
        <Title level={5}>name: {commande.entrepriseClt?.company_name}</Title>
        <Title level={5}>total: {commande?.total || "-"}</Title>
        status: <Tag color={getColor(commande?.commande_status)}>  {commande?.commande_status || "-"}</Tag>
        <Title level={5}>date: {commande?.commande_date?.split('T')[0] + "  " + commande?.commande_date?.split('T')[1].split('.')[0] || "-"}</Title>
        <Title level={5}>address: {commande?.commande_address[0]?.address + " " + commande?.commande_address[0]?.code_postal}</Title>
        <Title level={5}>Sommaire :</Title>
        <Table columns={[
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
          },]}
          dataSource={datasource.map((c, key) => ({
            key,
            produit: (<Title level={5}>{c.produit?.product_label}</Title>),
            qty: (<Title level={5}>{c.quantity}</Title>),
            status: (commande?.commande_status === ENCOURS ? <ClockCircleTwoTone />:<Title level={5}>{c?.statut ? <CheckCircleTwoTone />: 
            <CloseCircleTwoTone twoToneColor="#eb2f96" />}</Title> ),
          }))} pagination={false} className="ant-border-space" />
      </Modal>

    </>
  );
}

export default Commandes;
