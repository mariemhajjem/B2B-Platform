import { useState, useRef, useEffect, useLayoutEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import { createProduit, updateProduit } from "../../redux/reducers/produits"; 

const { TextArea } = Input;
const { Option } = Select;
let index = 0;
export default function ({ id, title, formData, visible, setIsAddVisible }) {
  const dispatch = useDispatch();
  const [file,setFile]=useState();
  const {allCategories} = useSelector((state) => state.categories);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const inputRef = useRef(null);
  
  useEffect(() => {
    const categoriesTab = allCategories.map((categorie) => ({
       label: categorie.category_name, value: categorie.category_name 
     }));
     console.log(categoriesTab)
    setCategories(categoriesTab)
  },[])
  
  const onFinish = ({ product_label,
    product_description,
    product_price,
    product_picture,
    product_category,
    product_quantity }) => {
      console.log(product_picture)
    let updatedProduit = {
      product_label,
      product_description,
      product_price: Number(product_price),
      product_picture: file,
      product_category,
      product_quantity: Number(product_quantity)
    }
    let form = new FormData();    //formdata object 
    form.append('product_label', product_label);   //append the values with key, value pair
    form.append('product_description', product_description);
    form.append('product_price', Number(product_price));
    form.append('product_quantity', Number(product_quantity));
    form.append('product_picture', file);
    form.append('product_category', product_category); 
    try {
      if (!formData) {
        console.log(form);
        dispatch(createProduit(form));
      } else {
        console.log({ id : formData._id, ...updatedProduit });
        const data = { id : formData._id, ...updatedProduit }
        dispatch(updateProduit(data));
      }

    } catch (error) {
      console.log(error)
    }
  };
  const handleFileUpload = (e) => {
    setFile(e.target.files[0])
  }

  const onNameChange = (event) => {
    setCategory(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setCategories([...categories, { label: category, value: category }]);
    setCategory('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
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
            placeholder="choisir ou ajouter catégorie"
            options={categories}
            dropdownRender={menu => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Space style={{ padding: '0 8px 4px' }}>
                  <Input
                    placeholder="categorie"
                    ref={inputRef}
                    value={category}
                    onChange={onNameChange}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem} disabled={!(category.length>3)}>
                    Ajouter categorie
                  </Button>
                </Space>
              </>
            )}
          />
        </Form.Item>
        <Form.Item
          name="product_quantity"
          label="Quantité du produit"
          rules={[
            {
              required: true,
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
          <Input type='file' onChange={handleFileUpload}/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" shape="round"> Valider </Button>
        </Form.Item>

      </Form>
    </Modal>
  );
}