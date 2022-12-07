import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, InputNumber, Space, Table } from 'antd';
import { changeQuantity, removeItem, clearCart } from '../../redux/reducers/cartSlice';
import './cart.css'
import OrderSteps from './delivery/OrderSteps';
import imgToString from '../../utils/imgToString';

function Cart() {
  const [err,setErr] = useState("");
  const [order,setOrder] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.loggedUser);
  const { cart } = useSelector((state) => state.persistedReducer);
  const { error } = useSelector((state) => state.commande);
  const [formData, setFormData] = useState({ 
    code_postal: '',
    company_phoneNumber: 0,   
    company_name: '', 
    company_email: '',  
    company_residence: '', 
    company_address: '',
  });
  const onChange = (values) => {
    setFormData(values)
  };
  useEffect(() => {
    user && setFormData({...formData,company_residence: [...user?.entrepriseClt?.company_residence?.split(",")], ...user?.entrepriseClt}) 
    setErr(error)
  }, [error])
  const getTotal = () => {
    let totalQuantity = 0
    let totalPrice = 0
    cart?.forEach(item => {
      totalQuantity += item.quantity
      totalPrice += item.product_price * item.quantity
    })
    return { totalPrice, totalQuantity }
  }
  const columns = [
    {
      title: 'Image',
      dataIndex: 'product_image',
      key: 'image',
      render: (_, produit) => { return <img alt="image produit" src={imgToString(produit?.product_picture)} width="70"/>},
    },
    {
      title: 'Produit',
      dataIndex: 'product_label',
      key: 'title',
      render: (_, produit) => <h5>{produit.product_label}</h5>,
    },
    {
      title: 'Prix',
      dataIndex: 'product_price',
      key: 'price',
      render: (_, produit) => <h5>{produit.product_price} DT</h5>,
    },
    {
      title: 'quantité',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <Space size="middle">
          <div className='cartItem__incrDec'> 
            <InputNumber min={1} max={record?.product_quantity}
            defaultValue={record.quantity} onChange={(quantity) => dispatch(changeQuantity({_id: record._id, quantity}))} />
          </div>
        </Space>
      ),
    },
    {
      title: 'Sous-total',
      dataIndex: 'sous-total',
      key: 'sous-total',
      render: (_, record) => ( 
            <h3>{record.quantity*record.product_price}</h3> 
      ),
    },
    {
      title: 'Supprimer',
      key: 'supprimer',
      render: (_, record) => (
        <Button danger onClick={() => dispatch(removeItem(record._id))}>Supprimer</Button>
      ),
    },
  ];
  const setOrderVisible = () => {
    setOrder(current => !current);
  }

  const sendCommande = () => { 
    if(!user) navigate("/sign-in") 
    setOrderVisible()    
  }

  return (<>
    <Space id="capture" wrap direction="vertical" size="middle" style={{ display: "flex", justifyContent: "center", padding: "0 10em" }}>
      <h1>Votre commande</h1>
      <h2>{"Date : " + new Date().toLocaleDateString()}</h2>
      <Space wrap style={{ display: "flex", alignItems:"flex-start" }}>
        <Table pagination={false} columns={columns} dataSource={cart} />
        <Card title="SOMMAIRE" style={{ height: "35%", width: "150%" }}>
          <h3>{getTotal().totalQuantity} article(s)</h3>
          <div style={{ display: "flex", alignItems:"flex-end" }}>
            <h3>Total (TTC)   <span>{getTotal().totalPrice} DT</span></h3>
          </div>
          
          <Button type='primary' onClick={sendCommande}>Commander</Button>
        </Card>
      </Space>
      <h3 style={{ padding: "-50em 0 0 10em" }}> <Link to='/'>{`< Continuer mes achats`}</Link></h3>
    </Space>
    {order? <OrderSteps visible={order} setOrder={setOrderVisible} onChange={onChange} formData={formData} />:null}
    </>
  )
}

export default Cart