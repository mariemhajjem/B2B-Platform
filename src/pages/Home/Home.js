import React, { useEffect } from "react";
import { Carousel, Divider, Image, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getAllProduits } from "../../redux/reducers/produits";
import Faq from "./Faq";
import Footer from "./Footer";
import Navbar from "./Navbar";
import tal from "../../assets/images/bg-profile.jpg";
import tal3 from "../../assets/images/bg-profile.jpg";
import Produit from "./Produit";
import "./home.css"
// import Chatbot from "./Chatbot";

const contentStyle = {
};

function Home() {
  const { allProduits } = useSelector((state) => state.produits);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const getTotalQuantity = () => {
    let total = 0
    cart?.forEach(item => {
      total += item.quantity
    })
    return total
  }
  useEffect(() => {
    dispatch(getAllProduits());
  }, []);

  return (
    <div id="Home">
      <Navbar />

      <Carousel autoplay>
        <div>
          <Image src={tal3} style={contentStyle} className="full" />
        </div>
        <div>
          <Image src={tal} className="full" style={contentStyle} />
        </div>
      </Carousel>
      <h1 style={{ display: "flex", justifyContent: "center", color: "black", margin: "2%" }}>Nos produits</h1>

      <Space size={50} wrap style={{ marginRight: "10%", marginLeft: "10%" }}>

        {allProduits?.map((value, index) => <Produit key={index} produit={value} />)}
      </Space>
      <Divider />
      <Faq />
      <Divider />
      {/* <Chatbot /> */}
      <div className='shopping-cart' onClick={() => navigate('/cart')}>
        <ShoppingCart id='cartIcon' />
        <p>{getTotalQuantity() || 0}</p>
      </div>
      <Footer />
    </div>
  );
}
export default Home;
