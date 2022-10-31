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
import { useState } from "react";
  
  // Images
  import face2 from "../../assets/images/face-2.jpg";
  
  const { Title } = Typography;

  // table code start
  const columns = [
    {
      title: "CLIENT",
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
      title: "STATUS",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Modifier",
      key: "update",
      dataIndex: "update",
    },
  ];
  
  const data = [
    {
      key: "1",
      name: (
        <>
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={face2}
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>Michael John</Title>
              <p>michael@mail.com</p>
            </div>
          </Avatar.Group>{" "}
        </>
      ),
      function: (
        <>
          <div className="author-info">
            <Title level={5}>Manager</Title>
            <p>Organization</p>
          </div>
        </>
      ),
     status: (
        <>
          <Button type="primary" className="tag-primary">
            ONLINE
          </Button>
        </>
      ), 
      update: (
        <>
          <Button type="primary" className="tag-primary">
            modifier
          </Button>
        </>
      ),
    }
  ];
  
  function Clients() {
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);
    const [err, setError] = useState("");
    const [code, setCode] = useState("");
    /* const error = useSelector((state) => state.errorReducer);
    useEffect(() => {
      if (error.message) {
        setError(error.message);
        setCode(error.code);
      }
    }, [error]);
    const popUp = (type) => {
      notification[type]({
        message: code,
        description: err,
        onClose: clearError,
      });
    }; */
    const handleClick = event => {
      // 👇️ toggle visibility
      setIsAddVisible(current => !current);
    };
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  
    return (
      <>
        <div className="tabled"> 
          <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
        <Button
              type="primary"
              onClick={() => setIsAddVisible(true)}
            >
              Ajouter client
            </Button>
            {/* {err && popUp("error")}
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
  