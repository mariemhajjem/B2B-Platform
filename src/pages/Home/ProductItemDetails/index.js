import { Card, Divider, Image, Input, InputNumber, Space, Spin } from 'antd';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAllProduits, getProduitById } from '../../../redux/reducers/produits';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { addToCart } from '../../../redux/reducers/cartSlice';
/* import SimilarProductItem from '../SimilarProductItem' */

import './index.css'
import imgToString from '../../../utils/imgToString';
import Produit from '../Produit';
import Navbar from '../Navbar';

const Style = {
  width: 450,
  height: 500,
  display: "flex", justifyContent: "center"
};
const Style1 = {
  width: 300,
  height: 500
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
export default function ProductItemDetails() {
  const [quantity, setQuantity] = useState(1);
  const [filteredArray, setFilteredArray] = useState([]);
  const { allProduits, produit, loading } = useSelector((state) => state.produits);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduits())
    dispatch(getProduitById(id))
    setFilteredArray((_) => {
      return allProduits?.filter(prod => prod.category_id?._id === produit?.category_id?._id && prod._id != produit?._id)
    });
    console.log(filteredArray)
  }, [])

  return (<div style={{ marginTop: "-20px" }}>
    {loading ? <Spin size="large" /> :
    <>
    <Navbar />
      {produit ?
        <div className="site-card-border-less-wrapper" style={{
          display: 'flex',
          justifyContent: "space-around",
          alignItems: 'center',
          paddingTop: '7%',
        }}>
          <Space wrap>
            <Card style={Style} cover={<Image src={imgToString(produit?.product_picture)} style={Style}/>}></Card>
            <Card
              style={Style}
            >
              <h1>{produit?.product_label}</h1>
              <h2>{produit?.category_id?.category_name}</h2>
              <p>{produit?.product_description}</p>
              <h2>{produit?.product_price} DT</h2>

              <Space split={<Divider type='vertical' />} >
                <h4>Quantité: </h4>
                <InputNumber min={1} max={produit?.product_quantity} defaultValue={quantity} onChange={(value) => {console.log(value); setQuantity(value)}} />
              </Space>
              <Divider />
              <button type="button" onClick={() => dispatch(addToCart({...produit,quantity}))}>
                ADD TO CART
              </button>
            </Card>
            <Space style={{ display: "flex", justifyContent: "flex-end", alignItems: 'center' }}>
              <Card style={Style1}>
                <h2>Informations fournisseur</h2>
                <Divider />
                <h2>{produit?.entrepriseImport?.company_name}</h2>
                <p>{produit?.entrepriseImport?.company_phoneNumber}</p>
                <p>{produit?.entrepriseImport?.company_email}</p>

                <Space split={<Divider type='vertical' />} >
                  <h4> </h4>
                </Space>
                <Divider />
                <p>Pour les demandes concernant les prix, la personnalisation ou les autres demandes de renseignements :</p>
                <button type="button" onClick={() => { }}>
                  Contactez le fournisseur
                </button>
              </Card></Space>
          </Space>
        </div> : <h1 className="product-not-found-heading">Produit indisponible</h1>}

      {filteredArray ? <><h1>Autres produits dans la même catégorie</h1>
        <Carousel swipeable={true} centerMode={true} responsive={responsive} itemClass="carousel-item-padding-20-px">
          {filteredArray?.map((value, index) => <Produit key={index} produit={value} />)}
        </Carousel></> : null}
    </>}</div>)
}
