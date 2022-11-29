import { 
  Button,
  Cascader, 
  Divider, 
  Form,
  Input, 
  Select,
} from 'antd';
import { Link } from 'react-router-dom';
//import "../../Auth/Signup.css";
import residences from '../../../constants/residences';
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
 
export const OrderPersonalInfo = ({ formData, setFormData, next }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ',values);
    setFormData({...formData,values});
    next()
  }; 

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="order"
      onFinish={onFinish}
      initialValues={formData}
      scrollToFirstError
    >  
      <Form.Item
        name="company_name"
        label="Nom entreprise"
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
        name="email"
        label="E-mail entreprise"
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
        rules={[
          { 
            required: true, 
          },
        ]}
      >
        <Input onChange={(e) => setFormData({ ...formData, company_address: e.target.value })} />
      </Form.Item> 

      <Form.Item
        name="code_postal"
        label="Code postal"
        rules={[
          { 
            required: true, 
          },{ min: 4, message: "Code postale est composée de 4 chiffres." },
          { max: 4 },
        ]} 
      >
        <Input onChange={(e) => setFormData({ ...formData, code_postal: e.target.value })}/>
      </Form.Item>
      <Form.Item
        name="company_phoneNumber"
        label="Phone Number"
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

      <div className="steps-action"> 
      <Form.Item {...tailFormItemLayout}>
         <Button type="primary" htmlType="submit">
            Next
          </Button>
      </Form.Item> 
      </div>
    </Form>
  );
};
