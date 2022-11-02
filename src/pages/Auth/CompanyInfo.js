import React, { useEffect, useState } from 'react';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import { useDispatch } from "react-redux";
import {register} from "../../redux/actions/auth"
import "./Signup.css";
import residences from '../../constants/residences';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const CompanyInfo = ({
  formData,
  setFormData,
  prev
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    residence: ['ariana', 'soukra'],
    address: '', 
    role: 'CLIENT',
    gender: '',
    password: '',
    confirmPassword: '',
    matricule_fiscale: '',
    company_name: '',
    company_phoneNumber: '',
    company_email: '', 
    logo: '',
    company_residence: ['ariana', 'soukra'], 
    company_address: '',
  });
  const onSubmit = ({matricule_fiscale,
  company_name,
  company_phoneNumber,
  company_email,  
  company_residence, 
  company_address}) => { 
    setFormData({...formData,matricule_fiscale,
      company_name,
      company_phoneNumber,
      company_email,  
      company_residence, 
      company_address}); 
    console.log(formData);  
    dispatch(register(formData));
  }
  useEffect(() =>{
    console.log(formData)
    setUser(formData)
  },[])
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (<>
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onSubmit}
      initialValues={formData}
      scrollToFirstError
    >

      <Form.Item
        name="company_name"
        label="company name*" 
        rules={[
          {
            required: true,
            message: 'Please input your company name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="matricule_fiscale"
        label="matricule fiscale*"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your matricule_fiscale!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="company_email"
        label="company email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="company_residence"
        label="Habitual Residence*"
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
        name="company_address"
        label="Adresse détaillée"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="company_phoneNumber"
        label="Phone Number*"
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
      <Form.Item
        name="website"
        label="Website"
      >
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
          <Input />
        </AutoComplete>
      </Form.Item>


      {/* <Form.Item 
        label="Captcha" 
        extra="We must make sure that your are a human.">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input the captcha you got!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item> */}

      <div className="steps-action">
        <Form.Item {...tailFormItemLayout}>

          <Button
            style={{
              margin: '0 24px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>

      </div>
    </Form>
  </>
  );
};