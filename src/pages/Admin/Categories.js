import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Typography,
  Divider,
  notification,
  Spin,
  Tag,
} from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategorie, getAllCategories } from "../../redux/reducers/categories";
import Category from "./Category";

const { Title } = Typography;

// table code start
const columns = [
  {
    title: "Nom catégorie",
    dataIndex: "name",
    key: "name",
    width: "70%",
  },
  /* {
    title: "Sous-catégories",
    dataIndex: "category",
    key: "category",
    width: "22%",
  }, */
  {
    title: "Modifier",
    key: "update",
    dataIndex: "update",
    width: "15%",
  },
  {
    title: "Supprimer",
    key: "delete",
    dataIndex: "delete",
    width: "15%",
  },
];


function Categories() {
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [err, setError] = useState("");
  const { role, entrepriseImport } = useSelector((state) => state.auth.loggedUser);
  const { allCategories, loading, error } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    category_name: '',
    category_children: [],
  });

  useEffect(() => { 
      dispatch(getAllCategories())
      if (error) {
        setError(error);
      }
    }, [error]);

  const handleUpdate = (prod) => {
    // 👇️ toggle visibility 
    setProduct({ ...prod})
    console.log({ ...prod})
    setIsUpdateVisible(current => !current);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategorie(id))
  }

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

  const data = allCategories?.map((prod, index) => ({
    key: index,
    name: (
      <>
        <div className="avatar-info">
          <Title level={5}>{prod?.category_name}</Title>
        </div>
      </>
    ),
    category: (
      <>
        <div className="avatar-info">
          <Title level={5}>{prod?.category_id || "-"}</Title>
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
              Ajouter catégorie
            </Button>
            {isAddVisible && <Category title="Ajouter catégorie" visible={isAddVisible} setIsAddVisible={handleClick} isAdd={true} formData={product} />}

            {isUpdateVisible && <Category title="Modifier catégorie" visible={isUpdateVisible} setIsAddVisible={handleUpdate} isAdd={false} formData={product} />}

            <Divider orientation="left"></Divider>
            {loading? <Spin size="large" /> : <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Tableau des catégories"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
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


export default Categories;
