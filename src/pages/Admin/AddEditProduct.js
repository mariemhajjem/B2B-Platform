import { useState, useRef, useEffect } from "react";
import {
  Modal,
  Form,
  Select,
  Input, 
  Button, 
  Divider, Space, notification, Switch
} from "antd";
import { PlusOutlined } from '@ant-design/icons';
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
  const [checked, setChecked] = useState(true);
  const inputRef = useRef(null);
  const [form] = Form.useForm();

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
      setError("");
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
    barcode,
    product_category,
    product_availability,
    quality_level,
    isShown,
    product_brand,
    product_quantity,suffix}) => { 
    let updatedProduit = {
      product_label:product_label.toLowerCase(),
      product_description,
      product_price: Number(product_price),
      barcode: Number(barcode),
      product_picture: file,
      product_category,
      product_availability,
      quality_level,
      product_brand,
      isShown,
      product_quantity: Number(product_quantity),
      id: user.entrepriseClt?._id || user.entrepriseImport?._id
    }
    let form = new FormData();
    form.append('product_label', product_label.toLowerCase());
    form.append('product_description', product_description);
    form.append('product_price', Number(product_price));
    form.append('product_quantity', Number(product_quantity));
    form.append('barcode', Number(barcode));
    form.append('product_picture', file);
    form.append('product_category', product_category);
    form.append('quality_level', quality_level);
    form.append('isShown', isShown);
    form.append('product_brand', product_brand);
    form.append('product_availability', product_availability);
    form.append('id', user.entrepriseClt?._id || user.entrepriseImport?._id);
    try {
      if (isAdd) {
        dispatch(createProduit(form));
      } else {
        // form.append('idProduit', formData._id);
        const data = { idProduit: formData._id, ...updatedProduit }
        dispatch(updateProduit(data));
      } 

    } catch (err) {
      console.log(err)
    }
    setIsAddVisible()
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
          label="Nom produit"
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
          name="barcode"
          label="Code à barre"
        >
          <Input />
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
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
        
        <Form.Item
          name="product_brand"
          label="La marque du produit"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

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
          name="isShown"
          label="Visibilité du produit"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Switch defaultChecked={formData.isShown} />
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