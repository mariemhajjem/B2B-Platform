import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Divider, Image, Space, FloatButton } from "antd";

import Faq from "./Faq";
import Footer from "./Footer";
import Navbar from "./Navbar";
import tal0 from "../../assets/images/bg0.jpg";
import tal1 from "../../assets/images/bg1.jpg";
import tal2 from "../../assets/images/bg2.jpg";
import Produit from "./Produit";
import "./home.css"
import { getAllProduits } from "../../redux/reducers/produits";
import { getAllCategories } from "../../redux/reducers/categories";

// import Chatbot from "./Chatbot";

const contentStyle = {
  height: "700px",
  width: "1600px",
};

function Home() {
  const { allProduits } = useSelector((state) => state.produits); 
  const cart = useSelector((state) => state.cart); 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllProduits());
  },[])
  const getTotalQuantity = () => {
    let total = 0
    cart?.forEach(item => {
      total += item.quantity
    })
    return total
  }

  return (
    <div id="Home" style={{ marginTop: "-20px", marginLeft: "-8px", overflowX: "hidden" }}>
      <Navbar />

      <Carousel autoplay autoplaySpeed={6000}>
        <div>
          <Image src={tal0} className="full" style={contentStyle} />
        </div>
        <div>
          <Image src={tal1} className="full" style={contentStyle} />
        </div>
        <div>
          <Image src={tal2} className="full" style={contentStyle} />
        </div>
      </Carousel>
      <h1 style={{ display: "flex", justifyContent: "center", color: "black" }}>Nos produits</h1>

      <Space size={50} wrap style={{ marginRight: "10%", marginLeft: "10%" }}>

        {allProduits?.map((value, index) => <Produit key={index} produit={value} />)}
      </Space>
      <Divider />
      <Faq />
      <Divider />
      {/* <Chatbot /> 
      <div className='shopping-cart' onClick={() => navigate('/cart')}>
        <ShoppingCart id='cartIcon' />
        <p>{getTotalQuantity() || 0}</p>
      </div>*/}
      <FloatButton.BackTop />
      <Footer />
    </div>
  );
}
export default Home;
