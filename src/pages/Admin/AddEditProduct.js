import { useState, useRef } from "react";
import {
  Modal,
  Form,
  Select,
  Input,
  Cascader,
  Button,
  Upload,
  Divider, Space,
} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux"; 


import { createProduit, updateProduit } from "../../redux/reducers/produits";

const { TextArea } = Input;
const { Option } = Select;
let index = 0;
export default function ({ id, title, formData, visible, setIsAddVisible }) {
  const dispatch = useDispatch();

  const onFinish = ({ product_label,
    product_description,
    product_price,
    product_picture,
    product_date,
    product_category }) => {
    let updatedProduit = {
      product_label,
      product_description,
      product_price: Number(product_price),
      product_picture: product_picture?.fileList,
      product_date,
      product_category
    }

    try {
      if (!id) {
        console.log(updatedProduit);
        dispatch(createProduit(updatedProduit));
      } else {
        const data = { id, updatedProduit }
        dispatch(updateProduit(data));
      }

    } catch (error) {
      console.log(error)
    }
  };

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="DT">DT</Option>
        <Option value="USD">$</Option>
        <Option value="EUR">€</Option>
      </Select>
    </Form.Item>
  );

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => { setFileList(newFileList); console.log(fileList) };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const [items, setItems] = useState(['jack', 'lucy']);
  const [name, setName] = useState('');
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <Modal
      title={title}
      visible={visible}
      footer={null}
      onCancel={setIsAddVisible}
    >

      <Form
        name="produit"
        onFinish={onFinish}
        initialValues={formData}
        scrollToFirstError
      >
        <Form.Item
          name="product_label"
          label="nom produit"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="product_category"
          label="Catégorie produit"
        >
          <Select
            style={{ width: 300 }}
            placeholder="custom dropdown render"
            dropdownRender={menu => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Space style={{ padding: '0 8px 4px' }}>
                  <Input
                    placeholder="categorie"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Ajouter categorie
                  </Button>
                </Space>
              </>
            )}
            options={items.map(item => ({ label: item, value: item }))}
          />
        </Form.Item>


        <Form.Item
          name="product_price"
          label="Prix du produit"
          rules={[
            {
              required: true,
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
          name="product_description"
          label="Description produit"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea rows={4} showCount maxLength={100} />
        </Form.Item>

        <Form.Item
          name="product_picture"
          label="product_picture"
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" shape="round"> Valider </Button>
        </Form.Item>

      </Form>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>

    </Modal>
  );
}