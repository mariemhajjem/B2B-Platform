import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel as AntdCarousel, Divider, Image, Space, FloatButton } from "antd";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function Home() {
  const { allProduits } = useSelector((state) => state.produits);
  const { allCategories, loading } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllProduits());
  }, [])

  return (
    <div id="Home" style={{ marginTop: "-20px", marginLeft: "-8px", overflowX: "hidden" }}>
      <Navbar />

      <AntdCarousel autoplay autoplaySpeed={6000}>
        <div>
          <Image src={tal0} className="full" style={contentStyle} />
        </div>
        <div>
          <Image src={tal1} className="full" style={contentStyle} />
        </div>
        <div>
          <Image src={tal2} className="full" style={contentStyle} />
        </div>
      </AntdCarousel>

      <h1 style={{ display: "flex", justifyContent: "center", color: "#e3823e", padding: "3%" }}>Nos catégories</h1>

      <ul className="grid">
        {allCategories?.map((value, index) =>
          <li className="grid__child">
            <img src={tal2} />
            <h4 style={{ display: "flex", justifyContent: "center" }}>{value.category_name}</h4>
          </li>)}
      </ul>

      <Divider />

      <h1 id="Produits" style={{ display: "flex", justifyContent: "center", color: "#e3823e" }}>Nos produits</h1>
      <Carousel transitionDuration={1000} centerMode={true} responsive={responsive} itemClass="carousel-item-padding-20-px">
        {allProduits?.map((value, index) => <Space><Produit key={index} produit={value} /></Space>)}
      </Carousel>

      <Divider />
      <Faq />
      <Divider />
      <FloatButton.BackTop />
      <Footer />
    </div>
  );
}
export default Home;
