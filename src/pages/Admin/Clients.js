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
import { blockUser, getAllUsers, getAllUsersByRole } from "../../redux/reducers/users";

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
    title: "Email",
    dataIndex: "email",
    key: "email",
  },

  {
    title: "Numéro de téléphone",
    key: "phoneNumber",
    dataIndex: "phoneNumber",
  },
  {
    title: "Bloquer/ débloquer",
    key: "block",
    dataIndex: "block",
  },
];



function Clients() {
  const [err, setError] = useState("");
  const [code, setCode] = useState("");
  const { list } = useSelector((state) => state.users);
  const { role, entrepriseImport } = useSelector((state) => state.auth.loggedUser);
   
  const dispatch = useDispatch();
  useEffect(() => {
    if (role === "ADMIN") {
      dispatch(getAllUsers())
    } else {
      dispatch(getAllUsersByRole(entrepriseImport?._id))
    }
  }, []);
  /* 
  const popUp = (type) => {
    notification[type]({
      message: code,
      description: err,
      onClose: clearError,
    });
  }; */
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const block = (id) => { dispatch(blockUser(id)) }
  const data = list?.map((user, key) => ({
    key: key,
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
            <Title level={5}>{`${user?.entrepriseClt?.company_name}`}</Title> 
          </div>
        </Avatar.Group>
      </>
    ),
    email: (
      <>
        <div className="author-info">
          <Title level={5}>{user.entrepriseClt?.company_email} </Title>
          <p></p>
        </div>
      </>
    ),
    phoneNumber: (
      <div className="author-info">
        <Title level={5}>{user.entrepriseClt?.company_phoneNumber} </Title>
        <p></p>
      </div>
    ),
    block: (
      <> {
        user.entrepriseClt?.isBlocked ?
          <Button type="primary" onClick={() => block(user.entrepriseClt?._id)} className="tag-primary">
            débloquer
          </Button> :
          <Button type="primary" danger onClick={() => block(user.entrepriseClt?._id)} className="tag-primary">
            bloquer
          </Button>
      }
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
