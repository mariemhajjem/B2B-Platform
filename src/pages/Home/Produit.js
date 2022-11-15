import { useEffect } from "react";
import { Link } from "react-router-dom";


export default function Produit({ produit }) {

  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + " ...";
    }
    return str;
  };
  useEffect(() => {
    console.log(produit)
  }, []);
  return (<>
    {/* <div class="col-md-3 col-sm-4">
            <div class="single-new-arrival">
                <div class="single-new-arrival-bg">
                    <img src="assets/images/arrivals1.png" alt="new-arrivals images" />
                    <div class="single-new-arrival-bg-overlay"></div>
                    <div class="sale bg-1">
                        <p>sale</p>
                    </div>
                    <div class="new-arrival-cart">
                        <p>
                            <span></span>
                            <a href="#"></a>
                            <button>commander</button>
                        </p>
                        <p class="arrival-review pull-right">
                            <span class="lnr lnr-heart"></span>
                            <span class="lnr lnr-frame-expand"></span>
                        </p>
                    </div>
                </div>
                <h4><a href="#"> article </a> <p>fournisseur</p></h4>
                <p class="arrival-product-price">$65.00</p>
            </div>
        </div> */}


    <div class="col-md-6">
      <div class="single-populer-products">
        <div class="single-inner-populer-products">
          <div class="row">
            <div class="col-md-4 col-sm-12">
              <div class="single-inner-populer-product-img">
                <img src="assets/images/p2.png" alt="populer-products images" />
              </div>
            </div>
            <div class="col-md-8 col-sm-12">
              <div class="single-inner-populer-product-txt">
                <h2>
                  <Link to="/details">
                    <span>{produit?.product_label}</span>
                  </Link>
                </h2>
                <p>
                  {produit?.product_description}
                </p>
                <div class="populer-products-price">
                  <h4>Sales Start from <span>$ {produit?.product_price}</span></h4>
                </div>
                <button class="btn-cart welcome-add-cart populer-products-btn" onClick={window.location.href = '#'}>
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