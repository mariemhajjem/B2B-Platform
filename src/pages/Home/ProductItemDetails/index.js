import { Card, Divider, Image, Space } from 'antd';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom'
import { setProduit } from '../../../redux/reducers/produits';
import Navbar from '../Navbar'; 
import {addToCart} from '../../../redux/reducers/cartSlice';
/* import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem' */

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Style = {
  width: 400,
  height: 500,
  display: "flex", justifyContent: "center"
};
const Style1 = {
  width: 300,
  height: 500,
  display: "flex", justifyContent: "flex-end"
};
export default function ProductItemDetails() { 
  const [quantity, setQuantity] = useState(1);
  const { allProduits } = useSelector((state) => state.produits);
  const { produit } = useSelector((state) => state.produits);
  const { id } = useParams()
  let location = useLocation();
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(location.pathname.split('/'))
    const product = allProduits.find(element => element._id ==id);
    dispatch(setProduit(product))
    
  },[])
  const onDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const onIncrementQuantity = () => {
    setQuantity(quantity + 1)
  }
  const base64String = btoa(
    String.fromCharCode(...new Uint8Array(produit.product_picture?.data?.data))
  );
  return (<> 
    {produit?
    <div className="site-card-border-less-wrapper" style={{
      display: 'flex',
      justifyContent:"space-around",
      alignItems: 'center',
      paddingTop: '5%',  
    }}>
      <Space wrap>
        <Image src={`data:${produit.product_picture?.contentType};base64,${base64String}`} style={Style} />
        <Card 
          style={Style}
        >
          <h1>{produit?.product_label}</h1> 
          <h2>{produit?.category_id?.category_name}</h2>
          <p>{produit?.product_description}</p> 
          <h2>{produit?.product_price} DT</h2>
           
            <Space split={<Divider type='vertical' />} >
              <h4>Quantité: </h4>
              <button
                type="button" 
                onClick={onDecrementQuantity} 
              >
                  -
              </button>
              <h4>{quantity}</h4>
              <button
                type="button"
                onClick={onIncrementQuantity} 
              >
                  +
              </button>
            </Space>
            <Divider />
            <button type="button" onClick={() => dispatch(addToCart(produit))}>
              ADD TO CART
            </button> 
        </Card>
        <Card 
          style={Style1}
        >
          <h2>Informations fournisseur</h2> 
          <h2>{produit?.category_id?.category_name}</h2>
          <p>{produit?.product_description}</p>  
           
            <Space split={<Divider type='vertical' />} >
              <h4> </h4> 
            </Space>
            <Divider /> 
            <p>Pour les demandes concernant les prix, la personnalisation ou les autres demandes de renseignements :</p>
            <button type="button" onClick={() => {}}>
              Contactez le fournisseur
            </button> 
        </Card>
      </Space></div> : <h1 className="product-not-found-heading">Product Not Found</h1>}
     
    <h1>Autres produits dans la même catégorie</h1>

  </>)
}

const getProductData = async () => { 
    /* const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    } 
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = getFormattedData(fetchedData)
      const updatedSimilarProductsData = fetchedData.similar_products.map(
        eachSimilarProduct => getFormattedData(eachSimilarProduct),
      )
      setProductData(updatedData);
      setSimilarProductsData(updatedSimilarProductsData);}*/ 

    /*  if (response.status === 404) {
       setApiStatus(apiStatusConstants.success)
     } */
  }

