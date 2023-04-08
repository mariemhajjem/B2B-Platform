import React, { useEffect, useState } from 'react';
import {
  AutoComplete,
  Button,
  Cascader, 
  Form,
  Input, 
  notification 
} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/reducers/auth"
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
  const dispatch = useDispatch();
  const navigate = useNavigate() 
  const [err, setError] = useState("");
  const [code, setCode] = useState("");
  useEffect(() => { 
  }, []);
  const onSubmit = ({ matricule_fiscale,
    company_name,
    company_phoneNumber,
    company_email,
    company_residence,
    company_address }) => {
    setFormData({
      ...formData, matricule_fiscale,
      company_name,
      company_phoneNumber,
      company_email,
      company_residence:company_residence.toString(),
      company_address
    });
    console.log(formData);
    try {
      dispatch(register(formData));
      navigate('/')

    } catch (error) {
      console.log(error)
    }
    

  }

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
  const clearError = () => {  
  };
  const popUp = (type) => {
    notification[type]({
      message: code,
      description: err,
      onClose: clearError,
    });
  };
  return (<>
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onSubmit}
      initialValues={formData}
      scrollToFirstError
    >
      <p className="parag"> 
          {err && popUp("error")}
        </p>
      <Form.Item
        name="company_name"
        label="Société"
        rules={[
          {
            required: true,
            message: 'Please input your company name!',
            whitespace: true,
          },
        ]}
      >
        <Input onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} />
      </Form.Item>

      <Form.Item
        name="matricule_fiscale"
        label="Matricule fiscale"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your matricule_fiscale!',
          },
          { min: 13, message: "matricule fiscale est composée de 13 chiffres." },
          { max: 13, message: "matricule fiscale est composée de 13 chiffres." },
        ]}
      >
        <Input onChange={(e) => setFormData({ ...formData, matricule_fiscale: e.target.value })} />
      </Form.Item>

      <Form.Item
        name="company_residence"
        label="Siège social"
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
        label="Siège social détaillée"
      >
        <Input onChange={(e) => setFormData({ ...formData, company_residence: e.target.value })} />
      </Form.Item>

      <Form.Item
        name="company_phoneNumber"
        label="Numéro de téléphone"
        rules={[
          { 
            required: true,
            message: 'Please input your phone number!',
          }, 
          { min: 8, message: "Numéro est composée de 8 chiffres." },
          { max: 8, message: "Numéro est composée de 8 chiffres." },
        ]}
      >
        <Input onChange={(e) => setFormData({ ...formData, company_phoneNumber: e.target.value })}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>
      
      <Form.Item
        name="company_email"
        label="Emai professionnel"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}
      >
        <Input onChange={(e) => setFormData({ ...formData, company_email: e.target.value })} />
      </Form.Item>
      <Form.Item
        name="website"
        label="Site web"
      >
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
          <Input onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
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
            Précédent
          </Button>
          <Button type="primary" htmlType="submit">
            S'enregistrer
          </Button>
        </Form.Item>

      </div>
    </Form>
  </>
  );
};