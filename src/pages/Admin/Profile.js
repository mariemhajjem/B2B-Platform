import { useState } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
  Form,
  Modal,
  Input,
  Cascader,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import BgProfile from "../../assets/images/bg.jpg";
import profilavatar from "../../assets/images/face-1.png";
import convesionImg from "../../assets/images/face-3.jpg";
import convesionImg2 from "../../assets/images/face-4.jpg";
import convesionImg3 from "../../assets/images/face-5.jpeg";
import convesionImg4 from "../../assets/images/face-6.jpeg";
import convesionImg5 from "../../assets/images/face-2.jpg";
import project1 from "../../assets/images/home-decor-1.jpeg";
import project2 from "../../assets/images/home-decor-2.jpeg";
import project3 from "../../assets/images/home-decor-3.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import residences from "../../constants/residences";
import { updateProfile } from "../../redux/reducers/auth";
import { Link } from "react-router-dom";

function Profile() {
  const [imageURL, setImageURL] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const [, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.auth.loggedUser);
  const [formData, setFormData] = useState({
    id: user?._id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    address: user?.address,
    residence: [...user?.residence?.split(",")],
    user_grade: user?.user_grade
  });
  const setModalVisible = () => {
    setVisible(current => !current)
  }
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(false);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageURL(false);
      });
    }
  };

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
      <div>Upload New Project</div>
    </div>
  );

  const data = [
    {
      title: "Sophie B.",
      avatar: convesionImg,
      description: "Hi! I need more information…",
    },
    {
      title: "Anne Marie",
      avatar: convesionImg2,
      description: "Awesome work, can you…",
    },
    {
      title: "Ivan",
      avatar: convesionImg3,
      description: "About files I can…",
    },
    {
      title: "Peterson",
      avatar: convesionImg4,
      description: "Have a great afternoon…",
    },
    {
      title: "Nick Daniel",
      avatar: convesionImg5,
      description: "Hi! I need more information…",
    },
  ];

  const project = [
    {
      img: project1,
      titlesub: "Project #1",
      title: "Modern",
      disciption:
        "As Uber works through a huge amount of internal management turmoil.",
    },
    {
      img: project2,
      titlesub: "Project #2",
      title: "Scandinavian",
      disciption:
        "Music is something that every person has his or her own specific opinion about.",
    },
    {
      img: project3,
      titlesub: "Project #3",
      title: "Minimalist",
      disciption:
        "Different people have different taste, and various types of music, Zimbali Resort",
    },
  ];
  const onFinish = ({ firstName,
    lastName,
    email,
    phoneNumber,
    residence,
    address }) => { 
    dispatch(updateProfile({
      ...formData, firstName,
      lastName,
      email,
      phoneNumber,
      residence: residence.toString(),
      address
    }))
    setModalVisible()
  }
  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{`${user?.firstName} ${user?.lastName}`} </h4>
                  <p>{`${user?.role?.toLowerCase()} `}</p>
                </div>
              </Avatar.Group>
            </Col>
            
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        {/* <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Platform Settings</h6>}
          >
            <ul className="list settings-list">
              <li>
                <Switch defaultChecked />

                <span>Email me when someone follows me</span>
              </li>
              <li>
                <Switch />
                <span>Email me when someone answers me</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Email me when someone mentions me</span>
              </li>
            </ul>
          </Card>
        </Col> */}
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Informations personnelles</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Button type="link" onClick={setModalVisible}>{pencil}</Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <Descriptions>
              <Descriptions.Item label="Nom complet" span={3}>
                {user?.firstName + " " + user?.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                (+216) {user?.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {user?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Adresse" span={3}>
                {user?.residence} {user?.address}
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a href="#pablo" className="mx-5 px-5">
                  {<TwitterOutlined />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<FacebookOutlined style={{ color: "#344e86" }} />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: "#e1306c" }} />}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        {user.role != "ADMIN" && <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Conversations</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <Link to={`/chats`}>Discussions</Link>
            <List
              itemLayout="horizontal"
              dataSource={data}
              split={false}
              className="conversations-list"
              renderItem={(item) => (<Link type="link" to={`/chats`}>
                <List.Item actions={[<Link type="link" to={`/chats`}>Répondre</Link>]}>
                  
                  <List.Item.Meta
                    avatar={
                      <Avatar shape="square" size={48} src={item.avatar} />
                    }
                    title={item.title}
                  />
                </List.Item></Link>
              )}
            />
          </Card>
        </Col>}
      </Row>
     {/*  <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">Projects</h6>
            <p>Architects design houses</p>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {project.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={p.img} />}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.titile}</h5>
                <p>{p.disciption}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button">VIEW PROJECT</Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
          <Col span={24} md={12} xl={6}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader projects-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageURL ? (
                <img src={imageURL} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        </Row>
      </Card>
 */}
      <Modal
        title="Modifier profil"
        open={visible}
        footer={null}
        onCancel={setModalVisible}
      >
        <Form
          name="profil"
          form={form}
          onFinish={onFinish}
          initialValues={formData}
          scrollToFirstError
        >
          <Form.Item
            name="firstName"
            label="Prénom"
            rules={[
              {
                required: true,
                message: 'Please input your firstname!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Nom"
            rules={[
              {
                required: true,
                message: 'Please input your lastname!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="residence"
            label="Résidence"
            rules={[
              {
                type: 'array',
                required: true,
                message: 'Please select your habitual residence!',
              },
            ]}
          >
            <Cascader options={residences} />
          </Form.Item>

          <Form.Item
            name="address"
            label="Adresse détaillée"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Numéro de téléphone"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" shape="round"> Valider </Button>
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
}

export default Profile;
