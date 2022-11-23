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
  width: 500,
  height: 500,
  display: "flex", justifyContent: "center"
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
  return (<> 
    {produit?
    <div className="site-card-border-less-wrapper" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '8%',
      width: '100%', 
    }}>
      <Space wrap>
        <Image src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={Style} />
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
            <button type="button" onClick={() => dispatch(addToCart({id: produit?._id, title: produit?.product_label, price: produit?.product_price}))}>
              ADD TO CART
            </button> 
        </Card>
      </Space></div> : <h1 className="product-not-found-heading">Product Not Found</h1>}
    <h1>Produits dans la même catégorie</h1>
  </>)
}
function ProductItemDetailss() {
  const [productData, setProductData] = useState({});
  const [similarProductsData, setSimilarProductsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams()

  useEffect(() => {
    getProductData()
  })

  const getFormattedData = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  })

  const getProductData = async () => {
    setApiStatus(apiStatusConstants.inProgress)
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
    setApiStatus(apiStatusConstants.success)

    /*  if (response.status === 404) {
       setApiStatus(apiStatusConstants.success)
     } */
  }

  const renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <h1>Loading...</h1>
    </div>
  )

  const renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="failure-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  const onDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const onIncrementQuantity = () => {
    setQuantity(quantity + 1)
  }

  const renderProductDetailsView = () => {
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = productData

    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{title}--------</h1>
            <p className="price-details">{price}----------</p>
            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="reviews-count">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <div className="label-value-container">
              <p className="label">Available:</p>
              <p className="value">{availability}</p>
            </div>
            <div className="label-value-container">
              <p className="label">Brand:</p>
              <p className="value">{brand}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementQuantity}
                testid="minus"
              >

              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrementQuantity}
                testid="plus"
              >

              </button>
            </div>
            <button type="button" className="button add-to-cart-btn">
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="similar-products-heading">Similar Products</h1>
        {/* <ul className="similar-products-list">
          {similarProductsData.map(eachSimilarProduct => (
            <SimilarProductItem
              productDetails={eachSimilarProduct}
              key={eachSimilarProduct.id}
            />
          ))}
        </ul> */}
      </div>
    )
  }

  const renderProductDetails = () => {

    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <>
      <Navbar />
      <div className="product-item-details-container">
        {renderProductDetails()}
      </div>
    </>
  )

}

