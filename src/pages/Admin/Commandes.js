import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Progress,
  Button,
  Avatar,
  Typography,
} from "antd";
import { Link } from "react-router-dom";

// Images
import ava1 from "../../assets/images/logo-shopify.svg";
import ava2 from "../../assets/images/logo-atlassian.svg";
import pencil from "../../assets/images/pencil.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCommandes, getCommandesByUser } from "../../redux/reducers/commande";
import { DeleteTwoTone, EyeTwoTone } from "@ant-design/icons";

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
  const { allCommandes } = useSelector((state) => state.commande);
  useEffect(() => { 
    /* if (role === "ADMIN") {
      dispatch(getAllCommandes());
    } else {
      //dispatch(getCommandesByUser({ id: enterpriseImport?._id }));
    } */
     
    dispatch(getAllCommandes()) 
  }, []);
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const dataproject = allCommandes.map((commande,key) =>({
      key,
      name: (<Title level={5}>{commande.entrepriseClt?.company_name}</Title>),
      total: (<div className="semibold">{commande?.total || "-"}</div>),
      status: (<div className="text-sm">{commande?.commande_status || "-"}</div>),
      date: (<div className="ant-progress-project">{commande?.commande_date?.split('T')[0] || "-"}</div>),
      address: (<div className="text-sm">{commande?.commande_address[0]?.address + ", " +commande?.commande_address[0]?.code_postal}</div>),
      action: (<div><Button><EyeTwoTone /></Button><Button><DeleteTwoTone twoToneColor="#eb2f96"/></Button></div>),
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
    </>
  );
}

export default Commandes;
