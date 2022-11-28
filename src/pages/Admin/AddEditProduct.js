import { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  Modal,
  Form,
  Select,
  Input, 
  Button, 
  Divider, Space, notification, InputNumber,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";

import { createProduit, updateProduit } from "../../redux/reducers/produits";  
const areas = [
  {
    label: 'Beijing',
    value: 'Beijing',
  },
  {
    label: 'Shanghai',
    value: 'Shanghai',
  },
];
const sights = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
};
const { TextArea } = Input;
const { Option } = Select;

export default function ({ title, formData, visible, setIsAddVisible,isAdd }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { allCategories } = useSelector((state) => state.categories);
  const user = useSelector((state) => state.auth.loggedUser)
  const { addError } = useSelector((state) => state.produits);
  const [err, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const inputRef = useRef(null);
  const [form] = Form.useForm();
  const handleChange = () => {
    form.setFieldsValue({
      sights: [],
    });
  };
  const availability_options = [
    { label: "En Stock", value: "En Stock" },
    { label: "Pré-commande", value: "Pré-commande" },
    { label: "Epuisé", value: "Epuisé" },
    { label: "Disponibilité limitée", value: "Disponibilité limitée" },
    { label: "En rupture de stock", value: "En rupture de stock" }]
  const quality_options = [
    { label: "Neuf avec emballage", value: "Neuf avec emballage" },
    { label: "Neuf sans emballage", value: "Neuf sans emballage" },
    { label: "Retour client fonctionnel", value: "Retour client fonctionnel" },
    { label: "Dommages dûs au transport", value: "Dommages dûs au transport" }]

  useEffect(() => {
    const categoriesTab = allCategories.map((categorie) => ({
      label: categorie.category_name, value: categorie.category_name
    }));
    console.log(categoriesTab)
    setCategories(categoriesTab)
    if (addError) {
      setError(addError);
    }
  }, [addError])

  const popUp = (type) => {
    notification[type]({
      message: err,
      description: err, 
    });
  };
  const onFinish = ({product_label,
    product_description,
    product_price,
    product_picture,
    product_category,
    product_availability,
    quality_level,
    product_quantity,suffix}) => { 
    let updatedProduit = {
      product_label,
      product_description,
      product_price: Number(product_price),
      product_picture: file,
      product_category,
      product_availability,
      quality_level,
      product_quantity: Number(product_quantity),
      id: user.enterpriseClt?._id || user.enterpriseImport?._id
    }
    let form = new FormData();
    form.append('product_label', product_label);
    form.append('product_description', product_description);
    form.append('product_price', Number(product_price));
    form.append('product_quantity', Number(product_quantity));
    form.append('product_picture', file);
    form.append('product_category', product_category);
    form.append('quality_level', quality_level);
    form.append('product_availability', product_availability);
    form.append('id', user.enterpriseClt?._id || user.enterpriseImport?._id);
    try {
      if (isAdd) {
        for (const pair of form.entries()) {
          console.log(`${pair[0]}, ${pair[1]}`);
        };
        dispatch(createProduit(form));
      } else {
        console.log({ id: formData._id, ...updatedProduit });
        const data = { id: formData._id, ...updatedProduit }
        dispatch(updateProduit(data));
      } 

    } catch (err) {
      console.log(err)
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
      open={visible}
      footer={null}
      onCancel={setIsAddVisible}
    >
      {err && popUp("error")}

      <Form
        name="produit"
        form={form}
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
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select 
            placeholder="choisir ou ajouter catégorie"
            options={categories}
            dropdownRender={menu => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Space wrap>
                  <Input
                    placeholder="ajouter une catégorie"
                    ref={inputRef}
                    value={category}
                    onChange={onNameChange}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem} disabled={!(category.length > 3)}>
                    Ajouter catégorie
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

      <Form.List name="sights">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                  }
                >
                  {() => (
                    <Form.Item
                      {...field}
                      label="quantités/intervalles"
                      name={[field.name, 'sight']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing sight',
                        },
                      ]}
                    >
                      <InputNumber />
                    </Form.Item>
                  )}
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Price"
                  name={[field.name, 'price']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing price',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Ajouter des prix/quantités/intervalles
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
        
        <Form.Item
          name="product_availability"
          label="Disponibilité du produit"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select 
            options={availability_options}
          />
        </Form.Item>

        <Form.Item
          name="quality_level"
          label="Qualité du produit"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select  
            options={quality_options}
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
          <Input type='file' onChange={handleFileUpload} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" shape="round"> Valider </Button>
        </Form.Item>

      </Form>
    </Modal>
  );
}