import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from "../../redux/actions/auth";
import { useDispatch } from 'react-redux'
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
} from "antd";
import signinbg from "../../assets/images/img-signin.jpg";

const { Title } = Typography;
const { Content } = Layout;

export default function SignIn() {
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const onFinish = async (values) => {
    const user = { 
      email: values.email,
      password: values.password,
    };
    try {
      dispatch(login(user))
      navigate('/')
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg('No Server Response');
      } else if (err.originalStatus === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.originalStatus === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
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
              Enter your email and password to sign in
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
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                className="username"
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  SIGN IN
                </Button>
              </Form.Item>
              <p className="font-semibold text-muted">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-dark font-bold">
                  Sign Up
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
