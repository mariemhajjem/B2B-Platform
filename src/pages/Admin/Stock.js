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
} from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Images 
import { deleteProduit, getAllProduits } from "../../redux/reducers/produits";
import { CLEAR_ERRORS } from "../../redux/reducers/error";
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
  const [id, setId] = useState(null);
  const [err, setError] = useState("");
  const [code, setCode] = useState("");
  const token = useSelector((state) => state.auth.loggedUser);
  const { allProduits } = useSelector((state) => state.produits); 
  const userId = token?.user?._id;
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    product_label: '',
    product_description: '',
    product_price: 0,
    product_picture: '',
    product_quantity: 0,
    product_date: '',
    product_category: ''
  });

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

  const error = useSelector((state) => state.error);

  useEffect(() => {
    /* if (userId) {
      dispatch(getToursByUser(userId));
    } */
    dispatch(getAllCategories())
    dispatch(getAllProduits()); 
    if (error.message) {
      setError(error.message);
      setCode(error.code);
    }
    setId(userId)
  }, [error, userId]);

  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + " ...";
    }
    return str;
  };

  const popUp = (type) => {
    notification[type]({
      message: code,
      description: err,
      onClose: CLEAR_ERRORS,
    });
  };
  const handleClick = event => {
    // 👇️ toggle visibility  
    setIsAddVisible(current => !current);
  };

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const data = allProduits?.map((prod, index) => ({
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
          <Title level={5}>{prod?.category_id?.category_name || prod?.category_id }</Title>
        </div>
      </>
    ),
    description: (
      <>
        <div className="author-info">
          <Title level={5}>{prod?.product_description}</Title>
          <p>{prod?.product_description}</p>
        </div>
      </>
    ),
    quantity: (
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
    update: (
      <>
        <Button type="primary" className="tag-primary" onClick={() => handleUpdate(prod)}>
          modifier
        </Button>
      </>
    ),
    delete: (<Button type="primary" danger className="tag-primary" onClick={() => handleDelete(prod._id)}>
      supprimer
    </Button>)
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
            {isAddVisible && <AddEditProduct title="Ajouter produit" visible={isAddVisible} setIsAddVisible={handleClick} formData={null} id={id} />}
            {err && popUp("error")}

            {isUpdateVisible && <AddEditProduct title="Modifier produit" visible={isUpdateVisible} setIsAddVisible={handleUpdate} formData={product} id={id} />}

            <Divider orientation="left"></Divider>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Products Table"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">All</Radio.Button>
                    <Radio.Button value="b">ONLINE</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}


export default Stock;
