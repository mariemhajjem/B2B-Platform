import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { clearErrors, login, resetPassword } from "../../redux/reducers/auth";
import { useDispatch, useSelector } from 'react-redux'
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Divider,
  notification,
} from "antd";
import signinbg from "../../assets/images/signin.png";

const { Title } = Typography;
const { Content } = Layout;

export default function SignIn() {
  const { error, loggedUser } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const CLIENT = "CLIENT";
	const FOURNISSEUR = "FOURNISSEUR";
  useEffect(() => {
  const popUp = (type) => {
      notification[type]({
        message: error, 
      });
      dispatch(clearErrors())
    };
    error && popUp("error")
  },[error])
  const onFinish = async (values) => {
    const user = { 
      email: values.email,
      password: values.password,
    };
    
    dispatch(login(user));
    if(loggedUser) {
      navigate('/')
    }
  }

  

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="layout-default ant-layout layout-sign-up">
      
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 6, offset: 2 }}
            md={{ span: 12 }}
          >
            <Title className="mb-15">Se connecter</Title>
            <Title className="font-regular text-muted" level={5}>
            Accéder à votre compte.
            </Title>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input onChange={(e) => setEmail(e.target.value)}/>
              </Form.Item>

              <Form.Item
                className="username"
                label="Mot de passe"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Se connecter
                </Button>
              </Form.Item>
              <Divider />
              <p className="font-semibold text-muted">
              Mot de passe oublié ? <br /> Insérez le mot de passe reçu sur votre email {email}. <br />
                <Button onClick={() =>{dispatch(resetPassword({email}))}} className="text-dark font-bold">
                  Envoyer mot de passe 
                </Button>
              </p>
              <p className="font-semibold text-muted">
              Vous êtes nouveau ? Créez votre compte rapidement <br />
                <Link to={`/sign-up/${FOURNISSEUR}`} className="text-dark font-bold">
                Créez compte fournisseur
                </Link> <br />
                <Link to={`/sign-up/${CLIENT}`} className="text-dark font-bold">
                Créez compte client
                </Link>
              </p>
              
            </Form>
          </Col>
          <Col
            className="sign-img"
            style={{ padding: 12 }}
            xs={{ span: 24 }}
            lg={{ span: 12 }}
            md={{ span: 12 }}
          >
            <img src={signinbg} alt="" />
          </Col>
        </Row>
      </Content>
    </div>
  );

}
