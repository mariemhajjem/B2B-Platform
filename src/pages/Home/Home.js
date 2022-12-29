import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel as AntdCarousel, Divider, FloatButton, Input } from "antd";
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
import Reclamation from "./Reclamation";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

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
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function Home() {
  const { allProduits, loading } = useSelector((state) => state.produits);
  const { allCategories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllProduits());
  }, [])

  useEffect(() => {

  }, [loading])
  return (
    loading ?
      <div class="spinner">
        <div class="cube1"></div>
        <div class="cube2"></div>
      </div> :
      <div id="Home" style={{ marginTop: "-20px", overflowX: "hidden" }}>
        <Navbar />

        <AntdCarousel autoplay autoplaySpeed={6000}>
          <div>
            <img src={tal0} alt="imagecarousel" className="full" style={contentStyle} />
          </div>
          <div>
            <img src={tal1} alt="imagecarousel" className="full" style={contentStyle} />
          </div>
          <div>
            <img src={tal2} alt="imagecarousel" className="full" style={contentStyle} />
          </div>
        </AntdCarousel>

        <h1 style={{ display: "flex", justifyContent: "center", color: "#e3823e", padding: "3%" }}>Nos catégories</h1>

        <ul className="grid">
          {allCategories?.map((value, index) =>
            <li className="grid__child" key={index}>
              <Link to={`/produits/${value._id}`}>
                <img src={tal2} alt="image_categorie" />
                <h4 style={{ display: "flex", justifyContent: "center" }}>{value.category_name}</h4>
              </Link>
            </li>)}
        </ul>

        <Divider />

        <h1 id="Produits" style={{ display: "flex", justifyContent: "center", color: "#e3823e" }}>Nos produits</h1>

        <Carousel swipeable={true} centerMode={true} responsive={responsive} itemClass="carousel-item-padding-20-px">
          {allProduits?.map((value, index) => <Produit key={index} produit={value} />)}
        </Carousel>

        <Divider />
        <Faq />
        <Divider />
        <Reclamation />
        <FloatButton.BackTop />
        <Divider />
        <Footer />
      </div>
  );
}
export default Home;
