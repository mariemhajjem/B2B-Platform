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
} from "antd"; 
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCommandes, getCommandesByUser, updateCommande } from "../../redux/reducers/commande";
import { CloseCircleTwoTone, EyeTwoTone } from "@ant-design/icons";

const { Title } = Typography;
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
  const [isVisible, setIsVisible] = useState(false);
  const [commande, setCommande] = useState({ commande_address: [] });
  const { allCommandes } = useSelector((state) => state.commande);
  const { role, entrepriseImport, entrepriseClt } = useSelector((state) => state.auth.loggedUser)
  useEffect(() => {
    if (role === "ADMIN") {
      dispatch(getAllCommandes());
    } else if (entrepriseImport?._id) {
      dispatch(getCommandesByUser({ idEntrepriseImport: entrepriseImport?._id }));
    } else {
      dispatch(getCommandesByUser({ idEntrepriseClt: entrepriseClt?._id }));
    }

    /* dispatch(getAllCommandes()) */
  }, []);
  const getColor = (status) => {
    switch (status) {
      case "En cours": return "orange";
      case "Confirmé": return "green";
      default: return "red";
    }
  }
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const refuser = (commande) => dispatch(updateCommande({ id: commande?._id, commande_status: "Refusée" }));
  const dataproject = allCommandes.map((commande, key) => ({
    key,
    name: (<Title level={5}>{commande.entrepriseClt?.company_name}</Title>),
    total: (<div className="semibold">{commande?.total || "-"}</div>),
    status: (<Tag color={getColor(commande?.commande_status)}>{commande?.commande_status || "-"}</Tag>),
    date: (<div className="ant-progress-project">{commande?.commande_date?.split('T')[0] || "-"}</div>),
    address: (<div className="text-sm">{commande?.commande_address[0]?.address + ", " + commande?.commande_address[0]?.code_postal}</div>),
    action: (<div>
      <Button onClick={() => { setCommande(commande);setIsVisible(current => !current) }}><EyeTwoTone /></Button>
      <Button onClick={() => refuser(commande)}><CloseCircleTwoTone twoToneColor="#eb2f96" /></Button>
    </div>),
  }));
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>

            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Tableau des commandes clients"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="all">
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="online">ONLINE</Radio.Button>
                    <Radio.Button value="store">STORES</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={project}
                  dataSource={dataproject}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title={"Détails commande"}
        open={isVisible}
        footer={[
          <Button key="submit" type="primary" disabled={commande.commande_status==="Refusée"} onClick={() =>{}}>
            Accepter
          </Button>
        ]}
        onCancel={() => setIsVisible(current => !current)}
      >
        <Title level={5}>name: {commande.entrepriseClt?.company_name}</Title>
        <Title level={5}>total: {commande?.total || "-"}</Title>
        status: <Tag color={getColor(commande?.commande_status)}>  {commande?.commande_status || "-"}</Tag>
        <Title level={5}>date: {commande?.commande_date?.split('T')[0] +"  " +commande?.commande_date?.split('T')[1].split('.')[0] || "-"}</Title>
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
          }]} 
          dataSource={commande?.commande_summary?.map((commande, key) => ({
            key,
            produit: (<Title level={5}>{commande.produit?.product_label}</Title>),
            qty: (<Title level={5}>{commande.quantity}</Title>),  
          }))} pagination={false} className="ant-border-space" />
      </Modal>

    </>
  );
}

export default Commandes;
