import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";


export default function Produit({ produit }) {
  const id = produit?._id;
  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + " ...";
    }
    return str;
  };
   
  return (<>
    {/* <div className="col-md-3 col-sm-4">
            <div className="single-new-arrival">
                <div className="single-new-arrival-bg">
                    <img src="assets/images/arrivals1.png" alt="new-arrivals images" />
                    <div className="single-new-arrival-bg-overlay"></div>
                    <div className="sale bg-1">
                        <p>sale</p>
                    </div>
                    <div className="new-arrival-cart">
                        <p>
                            <span></span>
                            <a href="#"></a>
                            <button>commander</button>
                        </p>
                        <p className="arrival-review pull-right">
                            <span className="lnr lnr-heart"></span>
                            <span className="lnr lnr-frame-expand"></span>
                        </p>
                    </div>
                </div>
                <h4><a href="#"> article </a> <p>fournisseur</p></h4>
                <p className="arrival-product-price">$65.00</p>
            </div>
        </div> */}


    <div className="col-md-6">
      <div className="single-populer-products">
        <div className="single-inner-populer-products">
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div className="single-inner-populer-product-img">
                <img src="assets/images/p2.png" alt="populer-products images" />
              </div>
            </div>
            <div className="col-md-8 col-sm-12">
              <div className="single-inner-populer-product-txt">
                <h2>
                  <Link to={`/details/${id}`}>
                    <span>{produit?.product_label}</span>
                  </Link>
                </h2>
                <p>
                  {produit?.product_description}
                </p>
                <div className="populer-products-price">
                  <h4>Sales Start from <span style={{color: "#e99c2e"}}>$ {produit?.product_price}</span></h4>
                </div>
                <button className="btn-cart welcome-add-cart populer-products-btn" onClick={() =>Navigate(`/details/${id}`)}>
                  discover more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );

}