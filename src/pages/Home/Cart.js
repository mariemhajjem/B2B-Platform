import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Space, Table } from 'antd';
import { decrementQuantity, incrementQuantity, removeItem, clearCart } from '../../redux/reducers/cartSlice';
import { createCommande } from '../../redux/reducers/commande';
import './cart.css'

function Cart() {
  const [err,setErr] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.loggedUser)
  const { cart } = useSelector((state) => state.persistedReducer);
  const { error } = useSelector((state) => state.commande);

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
      render: (_, produit) => <p>{produit.product_label}</p>,
    },
    {
      title: 'Prix',
      dataIndex: 'product_price',
      key: 'price',
      render: (_, produit) => <p>{produit.product_price} DT</p>,
    },
    {
      title: 'quantité',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <Space size="middle">
          <div className='cartItem__incrDec'>
            <button onClick={() => dispatch(decrementQuantity(record._id))}>-</button>
            <p>{record.quantity}</p>
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

  const sendCommande = () => {
    // TODO : check if not connected redirect to login/ register
    // else navigate or add here in the same component commande steps ( addresses + livraison)
    // show steps and hide table
    let commande = {
      commande_summary: [],
      id: user.enterpriseClt?._id || user.enterpriseImport?._id
    }
    cart.map((prod) => commande.commande_summary.push({ produit: prod._id, quantity: prod.quantity }))

    dispatch(createCommande(commande)) 
    dispatch(clearCart())
    
  }
  return (
    <Space id="capture" wrap direction="vertical" size="middle" style={{ display: "flex", justifyContent: "center", padding: "0 10em" }}>
      <h1>Votre commande</h1>
      <h2>{"Date : " + new Date().toLocaleDateString()}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        <Table pagination={false} columns={columns} dataSource={cart} style={{ width: "80%" }} />
        <Card title="SOMMAIRE" style={{ height: "35%" }}>
          <h4>Total TTC   <span>{getTotal().totalPrice} DT</span></h4>
          <p>({getTotal().totalQuantity} articles)</p>
          <Button type='primary' onClick={sendCommande}>Commander</Button>
        </Card>
      </div>
      <h3 style={{ padding: "-50em 0 0 10em" }}> <Link to='/'>{`< Continuer mes achats`}</Link></h3>
    </Space>
  )
}

export default Cart