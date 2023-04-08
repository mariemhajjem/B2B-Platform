import { 
  Button,
  Cascader, 
  Form,
  Input, 
  Select,
} from 'antd';
import { Link } from 'react-router-dom';
import "./Signup.css";
import residences from '../../constants/residences';
const { Option } = Select;
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
 
export const PersonalInfo = ({ formData, setFormData, next }) => {
  const [form] = Form.useForm();
  const onFinish = ({firstName,
  lastName,
  email,
  phoneNumber,
  password,
  residence,
  address,  
  gender}) => {
    setFormData({...formData,firstName,
      lastName,
      email,
      phoneNumber,
      residence : residence.toString(),
      address, 
      password, 
      gender});
    next()
  }; 
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={formData}
      scrollToFirstError
    >
    <Form.Item
        name="firstName"
        label="Prénom"
        // tooltip="What do you want others to call you?"
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
        label="E-mail"
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
        name="password"
        label="Mot de passe"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirmation"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
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
          { min: 8, message: "Numéro est composée de 8 chiffres." },
          { max: 8, message: "Numéro est composée de 8 chiffres." },
        ]}
      >
        <Input 
          style={{
            width: '100%',
          }}
        />
      </Form.Item> 
    <Form.Item
        name="gender"
        label="Genre" 
        rules={[ 
          {
            required: true,
            message: 'Please input your gender!',
          },
        ]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Homme</Option>
          <Option value="female">Femme</Option>
          <Option value="other">Autre</Option>
        </Select>
      </Form.Item>

      <div className="steps-action"> 
      <Form.Item {...tailFormItemLayout}>
         <Button type="primary" htmlType="submit">
            Suivant
          </Button>
          
      </Form.Item>
           <p className="font-semibold text-muted text-center">
            Vous avez déjà un compte?{" "}
            <Link to="/sign-in" className="font-bold text-dark">
              Se connecter
            </Link>
          </p>
      </div>
    </Form>
  );
};
