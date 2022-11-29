import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Space, Table } from 'antd';
import { decrementQuantity, incrementQuantity, removeItem, clearCart } from '../../redux/reducers/cartSlice';
import { createCommande } from '../../redux/reducers/commande';
import './cart.css'
import OrderSteps from './delivery/OrderSteps';

function Cart() {
  const [err,setErr] = useState("");
  const [order,setOrder] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.loggedUser)
  const { cart } = useSelector((state) => state.persistedReducer);
  const { error } = useSelector((state) => state.commande);
  const [formData, setFormData] = useState({ 
    code_postal: '',
    company_phoneNumber: 0,   
    company_name: '', 
    company_email: '',  
    company_residence: ['ariana', 'soukra'], 
    company_address: '',
  });
  const onChange = (values) => {
    setFormData(values)
  };
  useEffect(() => {
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
      render: (_, produit) => { const base64String = btoa(
        String.fromCharCode(...new Uint8Array(produit.product_picture?.data?.data))
      ); return <img alt="image produit" src={`data:${produit.product_picture?.contentType};base64,${base64String}`} width="70"/>},
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
            <button onClick={() => dispatch(decrementQuantity(record._id))}>-</button>
            <h3>{record.quantity}</h3>
            <button onClick={() => dispatch(incrementQuantity(record._id))}>+</button>
          </div>
        </Space>
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
    // TODO : check if not connected redirect to login/ register
    // else navigate or add here in the same component commande steps ( addresses + livraison) 
    if(!user) navigate("/sign-in")
    else setFormData({...formData,
      company_name:user.enterpriseClt?.company_name,
      company_email: user.enterpriseClt?.company_email,
      company_residence: user.enterpriseClt?.company_residence,
      company_phoneNumber: user.enterpriseClt?.company_phoneNumber,
      company_address: user.enterpriseClt?.company_address})
    setOrderVisible()    
  }

  return (<>
    <Space id="capture" wrap direction="vertical" size="middle" style={{ display: "flex", justifyContent: "center", padding: "0 10em" }}>
      <h1>Votre commande</h1>
      <h2>{"Date : " + new Date().toLocaleDateString()}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        <Table pagination={false} columns={columns} dataSource={cart} style={{ width: "60%" }} />
        <Card title="SOMMAIRE" style={{ height: "35%" }}>
          <h5>({getTotal().totalQuantity} articles)</h5>
          <h5>Total (TTC)   <span>{getTotal().totalPrice} DT</span></h5>
          
          <Button type='primary' onClick={sendCommande}>Commander</Button>
        </Card>
      </div>
      <h3 style={{ padding: "-50em 0 0 10em" }}> <Link to='/'>{`< Continuer mes achats`}</Link></h3>
    </Space>
    {order? <OrderSteps visible={order} setOrder={setOrderVisible} onChange={onChange} formData={formData} />:null}
    </>
  )
}

export default Cart