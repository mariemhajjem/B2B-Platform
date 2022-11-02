import {  
    Modal,
    Form,
    Select,
    InputNumber,
    Input,
    Cascader,
    Button
  } from "antd"; 

export default function ({ title, formData, visible, setIsAddVisible }) {
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
    const { Option } = Select;
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
    
  const residences = [
    {
      value: 'tunis',
      label: 'tunis',
      children: [
        {
          value: 'babsouika',
          label: 'bab souika',
        },
        {
          value: 'hayelkhadhra',
          label: 'hay el khadhra',
        },
      ],
    },
    {
      value: 'ariana',
      label: 'Ariana',
      children: [
        {
          value: 'soukra',
          label: 'Soukra', 
        },
      ],
    },
  ];
    return (
      <Modal
        title={title}
        visible={visible}
        footer={null}
        onCancel={setIsAddVisible}
      >
  
        <Form
          name="register"
          onFinish={onFinish}
          initialValues={formData}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
  
          <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
  
          <Form.Item
            name="residence"
            label="Habitual Residence"
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
            name="phone"
            label="Phone Number"
            rules={[ 
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              addonBefore={suffixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
  
          <Form.Item
            name="donation"
            label="Donation"
            rules={[
              {
                required: true,
                message: 'Please input donation amount!',
              },
            ]}
          >
            <Input
              addonAfter={suffixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: 'Please select gender!',
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
  
          <Form.Item>
            <Button type="primary" htmlType="submit" shape="round"> Valider </Button>
  
          </Form.Item>
  
        </Form>
  
  
      </Modal>
    );
  }