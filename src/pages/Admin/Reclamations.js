import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  message,
  Progress,
  Button,
  Typography,
} from "antd";

import { ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "antd/es/modal/Modal";
import { useSelector } from "react-redux";
import { getAllReclamations } from "../../redux/reducers/reclamation";
import { useDispatch } from "react-redux";

const { Title } = Typography;
// project table start
const project = [
  {
    title: "Email",
    dataIndex: "name",
    width: "32%",
  },
  {
    title: "réclamation",
    dataIndex: "reclamationText",
  },
  {
    title: "Date",
    dataIndex: "completion",
  },
];


function Reclamations() {
  const [isVisible, setIsVisible] = useState(false);
  const { allReclamations } = useSelector((state) => state.reclamation);
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const setVisible = () => setIsVisible(current => !current);
  const dispatch = useDispatch();

  useEffect(() => {
		
		dispatch(getAllReclamations());
		
	}, []);
  const dataproject = allReclamations.map((value, key) => ({
    key,
    name: (<Title level={5}>{value.email}</Title>),
    reclamationText: (
      <>
        <div className="text-sm">{value.reclamationText}</div>
      </>
    ),
    completion: (
      <>
        <div className="text-sm">{value.dateSentReport.substring(0,10)}</div>
      </>
    ),
  }))
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>

            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Projects Table"
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
        title={"Détails reclamation"}
        open={isVisible}
        width={1000}
        footer={[
          <Button key="refuse" type="primary"
            onClick={setVisible}>
            Terminer
          </Button>
        ]}
        onCancel={setVisible}
      >
        hi
      </Modal>
    </>
  );
}

export default Reclamations;
