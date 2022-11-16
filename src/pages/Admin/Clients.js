import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Button,
  Avatar,
  Typography,
  Divider,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Images
import face2 from "../../assets/images/face-2.jpg";
import { getAllUsers } from "../../redux/reducers/users";

const { Title } = Typography;

// table code start
const columns = [
  {
    title: "Utilisateur",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "FUNCTION",
    dataIndex: "function",
    key: "function",
  },

  {
    title: "Numéro de téléphone",
    key: "phoneNumber",
    dataIndex: "phoneNumber",
  },
  {
    title: "Bloquer",
    key: "block",
    dataIndex: "block",
  },
];



function Clients() { 
  const [err, setError] = useState("");
  const [code, setCode] = useState("");
  const { list } = useSelector((state) => state.users);
  // const userId = token?.user?._id;
  const dispatch = useDispatch();
  useEffect(() => {
    /* if (userId) {
      dispatch(getToursByUser(userId));
    } */
    dispatch(getAllUsers())
  }, []);
  /* const error = useSelector((state) => state.errorReducer);
   
  const popUp = (type) => {
    notification[type]({
      message: code,
      description: err,
      onClose: clearError,
    });
  }; */ 
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const data = list?.map((user) => ({
      key: "1",
      name: (
        <>
          <Avatar.Group>
            {/* <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={face2}
            ></Avatar> */}
            <div className="avatar-info">
              <Title level={5}>{`${user?.firstName} ${user?.lastName}`}</Title>
              <p>{user?.email}</p>
            </div>
          </Avatar.Group>
        </>
      ),
      function: (
        <>
          <div className="author-info">
            <Title level={5}>{user?.user_grade} </Title>
            <p></p>
          </div>
        </>
      ),
      phoneNumber: (
        <div className="author-info">
            <Title level={5}>{user?.phoneNumber} </Title>
            <p></p>
        </div>
      ),
      block: (
        <>
          <Button type="primary" danger className="tag-primary">
            bloquer
          </Button>
        </>
      ),
    }));
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            {/*<Button
              type="primary"
              onClick={() => setIsAddVisible(true)}
            >
              Ajouter client
            </Button>
             {err && popUp("error")}
            {isAddVisible && <AddClient />}
            {isUpdateVisible && <UpdateClient />} */}
          </Col>
          <Divider orientation="left"></Divider>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Clients Table"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">All</Radio.Button>
                    <Radio.Button value="b">ONLINE</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
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

export default Clients;
