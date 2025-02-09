import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Button,
  Typography,
  Divider,
  notification,
  Spin,
  Tag,
  Popconfirm,
} from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Images 
import { clearErrors, deleteProduit, getAllProduits, getProduitsByUser } from "../../redux/reducers/produits"; 
import AddEditProduct from "./AddEditProduct";
import { getAllCategories } from "../../redux/reducers/categories";

const { Title } = Typography;

// table code start
const columns = [
  {
    title: "Nom produit",
    dataIndex: "name",
    key: "name",
    width: "20%",
  },
  {
    title: "Catégorie",
    dataIndex: "category",
    key: "category",
    width: "22%",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: "10%",
  },
  {
    title: "Visible",
    dataIndex: "visible",
    key: "visible",
  },
  {
    title: "Quantité en stock",
    key: "quantity",
    dataIndex: "quantity",
  },
  {
    title: "Prix unitaire",
    key: "prix",
    dataIndex: "prix",
  },
  {
    title: "Modifier",
    key: "update",
    dataIndex: "update",
    width: "10%",
  },
  {
    title: "Supprimer",
    key: "delete",
    dataIndex: "delete",
    width: "10%",
  },
];

const AdminColumns = [
  {
    title: "Nom produit",
    dataIndex: "name",
    key: "name",
    width: "20%",
  },
  {
    title: "Catégorie",
    dataIndex: "category",
    key: "category",
    width: "22%",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Prix unitaire",
    key: "prix",
    dataIndex: "prix",
  },
  {
    title: "Supprimer",
    key: "delete",
    dataIndex: "delete",
  },
];


function Stock() {
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [products, setProducts] = useState();
  const [err, setError] = useState("");
  const { role, entrepriseImport } = useSelector((state) => state.auth.loggedUser);
  const { userProduits, allProduits, getError, loading } = useSelector((state) => state.produits);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    product_label: '',
    product_description: '', 
    product_picture: '', 
    product_date: '',
    product_category: '',
    product_availability: "En stock",
    isShown: true,
    quality_level: "Neuf avec emballage"
  });
  useEffect(() => {
      if (role === "ADMIN") {
        dispatch(getAllProduits());
      } else {
        dispatch(getProduitsByUser({ id: entrepriseImport?._id }));
      }
      console.log({ entreprise: entrepriseImport?._id })
      dispatch(getAllCategories())
      setProducts(role === "ADMIN" ? allProduits : userProduits)
      /* if (getError) {
        setError(getError);
        dispatch(clearErrors())
      } */

    }, []);
  const handleUpdate = (prod) => {
    // 👇️ toggle visibility 
    setProduct({ ...prod, product_picture: "", product_category: prod.category_id?.category_name })
    console.log({ ...prod, product_picture: "", product_category: prod.category_id?.category_name })
    setIsUpdateVisible(current => !current);
  };

  const handleDelete = (id) => {
    console.log("Stock:", id);
    dispatch(deleteProduit(id))
  }

  const excerpt = (str) => {
    if (str.length > 30) {
      str = str.substring(0, 30) + " ...";
    }
    return str;
  };

  const popUp = (type) => {
    notification[type]({
      message: err,
      description: err, 
    });
  };
  const handleClick = event => {
    // 👇️ toggle visibility  
    setIsAddVisible(current => !current);
  };

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  let produits = role === "ADMIN" ? allProduits : userProduits;
 
  const data = produits?.map((prod, index) => ({
    key: index,
    name: (
      <>
        <div className="avatar-info">
          <Title level={5}>{prod?.product_label}</Title>
        </div>
      </>
    ),
    category: (
      <>
        <div className="avatar-info">
          <Title level={5}>{prod?.category_id?.category_name || prod?.category_id}</Title>
        </div>
      </>
    ),
    description: (
      <>
        <div className="author-info">
          <p>{excerpt(prod?.product_description)}</p>
        </div>
      </>
    ),
    visible:  !(role === "ADMIN") && (prod?.isShown ? <Tag color="green">Oui</Tag> : <Tag color="red">Non</Tag>),
    quantity:  !(role === "ADMIN") && (
      <>
        <div className="author-info">
          <Title level={5}>{prod?.product_quantity}</Title>
        </div>
      </>
    ),
    prix: (
      <>
        <div className="author-info">
          <Title level={5}>{prod?.product_price}</Title>
        </div>
      </>
    ),
    update: !(role === "ADMIN") && (
      <>
        <Button type="primary" className="tag-primary" onClick={() => handleUpdate(prod)}>
          modifier
        </Button>
      </>
    ),
    delete: (<Popconfirm
      title="êtes-vous sûr de vouloir supprimer ce produit?"
      description="Delete the task"
      onConfirm={() => handleDelete(prod._id)}
      okText="Oui"
      cancelText="Non"
      >
      <Button type="primary" danger className="tag-primary">
      supprimer
    </Button></Popconfirm>)
    
  }));

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 24]}>
          <Col xs="24" xl={24}>
            <Button
              type="primary"
              onClick={handleClick}
            >
              Ajouter produit
            </Button>
            {isAddVisible && <AddEditProduct title="Ajouter produit" visible={isAddVisible} setIsAddVisible={handleClick} isAdd={true} formData={product} />}
            {err && popUp("error")}

            {isUpdateVisible && <AddEditProduct title="Modifier produit" visible={isUpdateVisible} setIsAddVisible={handleUpdate} isAdd={false} formData={product} />}

            <Divider orientation="left"></Divider>
            {loading? <Spin size="large" /> : <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Products Table"
              /* extra={!(role === "ADMIN") &&
                <>  
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">Tous</Radio.Button>
                    <Radio.Button value="b">Visible</Radio.Button>
                  </Radio.Group>
                </>
              } */
            >
              <div className="table-responsive">
                <Table
                  columns={role === "ADMIN" ? AdminColumns : columns}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>}
          </Col>
        </Row>
      </div>
    </>
  );
}


export default Stock;
