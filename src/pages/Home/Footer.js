import React from "react";
import "./Footer.css";
import { useTranslation } from "react-i18next";
import { Divider, Space } from "antd";

const footerS = {
  background: "rgb(248, 248, 248)",
  margin: "20px",
  pading: "20px",
};
// const changeLanguage = (ln) => {
//   return () => {
//     i18n.changeLanguage(ln);
//   };
// };
function Footer() {
  const { t } = useTranslation();
  return (<> 
    <Space size={60} align="center" wrap split={<Divider type="vertical" />} 
      style={{display: "flex", justifyContent: "center"}}>    
            <div >
              <div>
                <div >
                  <h4>information</h4>
                </div>
                <div>
                  <ul style={{listStyleType: "none"}}>
                    <li><a href="#">about us</a></li>
                    <li><a href="#">contact us</a></li>
                    <li><a href="#">news</a></li>
                    <li><a href="#">store</a></li>
                  </ul>
                </div>
              </div>
            </div> 
            <div>
              <div>
                <div>
                  <h4>my accounts</h4>
                </div>
                <div>
                  <ul>
                    <li ><a href="#" style={{color: "#a09e9c"}}>my account</a></li>
                    <li><a href="#">wishlist</a></li> 
                    <li><a href="#">order history</a></li>
                    <li><a href="#">my cart</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <h4>newsletter</h4>
                </div>
                <div>
                  <p>
                    Subscribe  to get latest news,update and information.
                  </p>
                </div>
                <div>
                  <div>
                    <input type="text" className="form-control" placeholder="Enter Email Here...." />
                  </div>
                  <div >
                    <span><i className="fa fa-location-arrow"></i></span>
                  </div>
                </div>
              </div>
            </div>   
    </Space>
    <footer id="footer" className="footer">
      <div className="container">
        <div className="hm-footer-copyright text-center">
          <div className="footer-social">
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-instagram"></i></a>
            <a href="#"><i className="fa fa-linkedin"></i></a>
            <a href="#"><i className="fa fa-pinterest"></i></a>
          </div>
          <p>
            &copy;copyright. designed and developed by Mariem Hajjem
          </p>
        </div>
      </div>
      <div id="scroll-Top">
        <div className="return-to-top">
          <i className="fa fa-angle-up " id="scroll-top" data-toggle="tooltip" data-placement="top" title="" data-original-title="Back to Top" aria-hidden="true"></i>
        </div>

      </div>

    </footer> </>
  );
}
export default Footer;
