import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";



function Home() {

  const { t } = useTranslation();
  //const history = useHistory();
  const changeLanguage = (ln) => {
    return () => {
      i18n.changeLanguage(ln);
    };
  };
  const logout = (e) => {
    // history.push("/home");
  };

  return (
    <div className="App">
      <header id="home" class="welcome-hero">
        <div id="header-carousel" class="carousel slide carousel-fade" data-ride="carousel">

          <ol class="carousel-indicators">
            <li data-target="#header-carousel" data-slide-to="0" class="active"><span class="small-circle"></span></li>
            <li data-target="#header-carousel" data-slide-to="1"><span class="small-circle"></span></li>
            <li data-target="#header-carousel" data-slide-to="2"><span class="small-circle"></span></li>
          </ol>
          <div class="carousel-inner" role="listbox">

            <div class="item active">
              <div class="single-slide-item slide1">
                <div class="container">
                  <div class="welcome-hero-content">
                    <div class="row">
                      <div class="col-sm-7">
                        <div class="single-welcome-hero">
                          <div class="welcome-hero-txt">
                            <h4>great design collection</h4>
                            <h2>cloth covered accent chair</h2>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiuiana smod tempor  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                            </p>
                            <div class="packages-price">
                              <p>
                                $ 399.00
                                <del>$ 499.00</del>
                              </p>
                            </div>
                            <button class="btn-cart welcome-add-cart" onclick="window.location.href='#'">
                              <span class="lnr lnr-plus-circle"></span>
                              add <span>to</span> cart
                            </button>
                            <button class="btn-cart welcome-add-cart welcome-more-info" onclick="window.location.href='#'">
                              more info
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-5">
                        <div class="single-welcome-hero">
                          <div class="welcome-hero-img">
                            <img src="assets/images/slider1.png" alt="slider image" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="single-slide-item slide2">
                <div class="container">
                  <div class="welcome-hero-content">
                    <div class="row">
                      <div class="col-sm-7">
                        <div class="single-welcome-hero">
                          <div class="welcome-hero-txt">
                            <h4>great design collection</h4>
                            <h2>mapple wood accent chair</h2>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiuiana smod tempor  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                            </p>
                            <div class="packages-price">
                              <p>
                                $ 199.00
                                <del>$ 299.00</del>
                              </p>
                            </div>
                            <button class="btn-cart welcome-add-cart" onclick="window.location.href='#'">
                              <span class="lnr lnr-plus-circle"></span>
                              add <span>to</span> cart
                            </button>
                            <button class="btn-cart welcome-add-cart welcome-more-info" onclick="window.location.href='#'">
                              more info
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-5">
                        <div class="single-welcome-hero">
                          <div class="welcome-hero-img">
                            <img src="assets/images/slider2.png" alt="slider image" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="single-slide-item slide3">
                <div class="container">
                  <div class="welcome-hero-content">
                    <div class="row">
                      <div class="col-sm-7">
                        <div class="single-welcome-hero">
                          <div class="welcome-hero-txt">
                            <h4>great design collection</h4>
                            <h2>valvet accent arm chair</h2>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiuiana smod tempor  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                            </p>
                            <div class="packages-price">
                              <p>
                                $ 299.00
                                <del>$ 399.00</del>
                              </p>
                            </div>
                            <button class="btn-cart welcome-add-cart" onclick="window.location.href='#'">
                              <span class="lnr lnr-plus-circle"></span>
                              add <span>to</span> cart
                            </button>
                            <button class="btn-cart welcome-add-cart welcome-more-info" onclick="window.location.href='#'">
                              more info
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-5">
                        <div class="single-welcome-hero">
                          <div class="welcome-hero-img">
                            <img src="assets/images/slider3.png" alt="slider image" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="top-area">
          <div class="header-area">

            <nav class="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">

              <div class="top-search">
                <div class="container">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    <input type="text" class="form-control" placeholder="Search" />
                    <span class="input-group-addon close-search"><i class="fa fa-times"></i></span>
                  </div>
                </div>
              </div>

              <div class="container">

                <div class="attr-nav">
                  <ul>
                    <li class="search">
                      <a href="#"><span class="lnr lnr-magnifier"></span></a>
                    </li>
                    <li class="nav-setting">
                      <a href="#"><span class="lnr lnr-cog"></span></a>
                    </li>
                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" >
                        <span class="lnr lnr-cart"></span>
                        <span class="badge badge-bg-1">2</span>
                      </a>
                      <ul class="dropdown-menu cart-list s-cate">
                        <li class="single-cart-list">
                          <a href="#" class="photo"><img src="assets/images/arrivals1.png" class="cart-thumb" alt="image" /></a>
                          <div class="cart-list-txt">
                            <h6><a href="#">arm <br /> chair</a></h6>
                            <p>1 x - <span class="price">$180.00</span></p>
                          </div>
                          <div class="cart-close">
                            <span class="lnr lnr-cross"></span>
                          </div>
                        </li>
                        <li class="single-cart-list">
                          <a href="#" class="photo"><img src="assets/images/arrivals2.png" class="cart-thumb" alt="image" /></a>
                          <div class="cart-list-txt">
                            <h6><a href="#">single <br /> armchair</a></h6>
                            <p>1 x - <span class="price">$180.00</span></p>
                          </div>
                          <div class="cart-close">
                            <span class="lnr lnr-cross"></span>
                          </div>
                        </li>
                        <li class="single-cart-list">
                          <a href="#" class="photo"><img src="assets/images/arrivals3.png" class="cart-thumb" alt="image" /></a>
                          <div class="cart-list-txt">
                            <h6><a href="#">wooden arn <br /> chair</a></h6>
                            <p>1 x - <span class="price">$180.00</span></p>
                          </div>
                          <div class="cart-close">
                            <span class="lnr lnr-cross"></span>
                          </div>
                        </li>
                        <li class="total">
                          <span>Total: $0.00</span>
                          <button class="btn-cart pull-right" onclick="window.location.href='#'">view cart</button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div class="navbar-header">
                  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                    <i class="fa fa-bars"></i>
                  </button>
                  <a class="navbar-brand" href="#">Jassa.</a>
                </div>
                <div class="collapse navbar-collapse menu-ui-design" id="navbar-menu">
                  <ul class="nav navbar-nav navbar-center" data-in="fadeInDown" data-out="fadeOutUp">
                    <li class=" scroll active"><a href="#home">home</a></li>
                    <li class="scroll"><a href="#new-arrivals">new arrival</a></li>
                    <li class="scroll"><a href="#feature">features</a></li>

                    <li class="scroll"><a href="#newsletter">contact</a></li>
                    <li class="">
                      {<Link to="/sign-up">
                        <span>{t("S'inscrire")}</span>
                      </Link>}
                    </li>
                    <li class="">
                      {<Link to="/sign-in">
                        <span>{t("Se connecter")}</span>
                      </Link>}
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

          </div>
          <div class="clearfix"></div>
        </div>

        <section id="populer-products" class="populer-products">
          <div class="container">
            <div class="populer-products-content">
              <div class="row">
                <div class="col-md-3">
                  <div class="single-populer-products">
                    <div class="single-populer-product-img mt40">
                      <img src="assets/images/p1.png" alt="populer-products images" />
                    </div>
                    <h2><a href="#">arm chair</a></h2>
                    <div class="single-populer-products-para">
                      <p>Nemo enim ipsam voluptatem quia volu ptas sit asperna aut odit aut fugit.</p>
                    </div>
                  </div>
                </div>
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
                              <a href="#">
                                latest designed stool <span>and</span> chair
                              </a>
                            </h2>
                            <p>
                              Edi ut perspiciatis unde omnis iste natusina error sit voluptatem accusantium doloret mque laudantium, totam rem aperiam.
                            </p>
                            <div class="populer-products-price">
                              <h4>Sales Start from <span>$99.00</span></h4>
                            </div>
                            <button class="btn-cart welcome-add-cart populer-products-btn" onclick="window.location.href='#'">
                              discover more
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="single-populer-products">
                    <div class="single-populer-products">
                      <div class="single-populer-product-img">
                        <img src="assets/images/p3.png" alt="populer-products images" />
                      </div>
                      <h2><a href="#">hanging lamp</a></h2>
                      <div class="single-populer-products-para">
                        <p>Nemo enim ipsam voluptatem quia volu ptas sit asperna aut odit aut fugit.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="new-arrivals" class="new-arrivals">
          <div class="container">
            <div class="section-header">
              <h2>new arrivals</h2>
            </div>
            <div class="new-arrivals-content">
              <div class="row">
                <div class="col-md-3 col-sm-4">
                  <div class="single-new-arrival">
                    <div class="single-new-arrival-bg">
                      <img src="assets/images/arrivals1.png" alt="new-arrivals images" />
                      <div class="single-new-arrival-bg-overlay"></div>
                      <div class="sale bg-1">
                        <p>sale</p>
                      </div>
                      <div class="new-arrival-cart">
                        <p>
                          <span class="lnr lnr-cart"></span>
                          <a href="#">add <span>to </span> cart</a>
                        </p>
                        <p class="arrival-review pull-right">
                          <span class="lnr lnr-heart"></span>
                          <span class="lnr lnr-frame-expand"></span>
                        </p>
                      </div>
                    </div>
                    <h4><a href="#">wooden chair</a></h4>
                    <p class="arrival-product-price">$65.00</p>
                  </div>
                </div>
                <div class="col-md-3 col-sm-4">
                  <div class="single-new-arrival">
                    <div class="single-new-arrival-bg">
                      <img src="assets/images/arrivals2.png" alt="new-arrivals images" />
                      <div class="single-new-arrival-bg-overlay"></div>
                      <div class="sale bg-2">
                        <p>sale</p>
                      </div>
                      <div class="new-arrival-cart">
                        <p>
                          <span class="lnr lnr-cart"></span>
                          <a href="#">add <span>to </span> cart</a>
                        </p>
                        <p class="arrival-review pull-right">
                          <span class="lnr lnr-heart"></span>
                          <span class="lnr lnr-frame-expand"></span>
                        </p>
                      </div>
                    </div>
                    <h4><a href="#">single armchair</a></h4>
                    <p class="arrival-product-price">$80.00</p>
                  </div>
                </div>
                <div class="col-md-3 col-sm-4">
                  <div class="single-new-arrival">
                    <div class="single-new-arrival-bg">
                      <img src="assets/images/arrivals3.png" alt="new-arrivals images" />
                      <div class="single-new-arrival-bg-overlay"></div>
                      <div class="new-arrival-cart">
                        <p>
                          <span class="lnr lnr-cart"></span>
                          <a href="#">add <span>to </span> cart</a>
                        </p>
                        <p class="arrival-review pull-right">
                          <span class="lnr lnr-heart"></span>
                          <span class="lnr lnr-frame-expand"></span>
                        </p>
                      </div>
                    </div>
                    <h4><a href="#">wooden armchair</a></h4>
                    <p class="arrival-product-price">$40.00</p>
                  </div>
                </div>
                <div class="col-md-3 col-sm-4">
                  <div class="single-new-arrival">
                    <div class="single-new-arrival-bg">
                      <img src="assets/images/arrivals4.png" alt="new-arrivals images" />
                      <div class="single-new-arrival-bg-overlay"></div>
                      <div class="sale bg-1">
                        <p>sale</p>
                      </div>
                      <div class="new-arrival-cart">
                        <p>
                          <span class="lnr lnr-cart"></span>
                          <a href="#">add <span>to </span> cart</a>
                        </p>
                        <p class="arrival-review pull-right">
                          <span class="lnr lnr-heart"></span>
                          <span class="lnr lnr-frame-expand"></span>
                        </p>
                      </div>
                    </div>
                    <h4><a href="#">stylish chair</a></h4>
                    <p class="arrival-product-price">$100.00</p>
                  </div>
                </div>
                <div class="col-md-3 col-sm-4">
                  <div class="single-new-arrival">
                    <div class="single-new-arrival-bg">
                      <img src="assets/images/arrivals5.png" alt="new-arrivals images" />
                      <div class="single-new-arrival-bg-overlay"></div>
                      <div class="new-arrival-cart">
                        <p>
                          <span class="lnr lnr-cart"></span>
                          <a href="#">add <span>to </span> cart</a>
                        </p>
                        <p class="arrival-review pull-right">
                          <span class="lnr lnr-heart"></span>
                          <span class="lnr lnr-frame-expand"></span>
                        </p>
                      </div>
                    </div>
                    <h4><a href="#">modern chair</a></h4>
                    <p class="arrival-product-price">$120.00</p>
                  </div>
                </div>
                <div class="col-md-3 col-sm-4">
                  <div class="single-new-arrival">
                    <div class="single-new-arrival-bg">
                      <img src="assets/images/arrivals6.png" alt="new-arrivals images" />
                      <div class="single-new-arrival-bg-overlay"></div>
                      <div class="sale bg-1">
                        <p>sale</p>
                      </div>
                      <div class="new-arrival-cart">
                        <p>
                          <span class="lnr lnr-cart"></span>
                          <a href="#">add <span>to </span> cart</a>
                        </p>
                        <p class="arrival-review pull-right">
                          <span class="lnr lnr-heart"></span>
                          <span class="lnr lnr-frame-expand"></span>
                        </p>
                      </div>
                    </div>
                    <h4><a href="#">mapple wood dinning table</a></h4>
                    <p class="arrival-product-price">$140.00</p>
                  </div>
                </div>
                <div class="col-md-3 col-sm-4">
                  <div class="single-new-arrival">
                    <div class="single-new-arrival-bg">
                      <img src="assets/images/arrivals7.png" alt="new-arrivals images" />
                      <div class="single-new-arrival-bg-overlay"></div>
                      <div class="sale bg-2">
                        <p>sale</p>
                      </div>
                      <div class="new-arrival-cart">
                        <p>
                          <span class="lnr lnr-cart"></span>
                          <a href="#">add <span>to </span> cart</a>
                        </p>
                        <p class="arrival-review pull-right">
                          <span class="lnr lnr-heart"></span>
                          <span class="lnr lnr-frame-expand"></span>
                        </p>
                      </div>
                    </div>
                    <h4><a href="#">arm chair</a></h4>
                    <p class="arrival-product-price">$90.00</p>
                  </div>
                </div>
                <div class="col-md-3 col-sm-4">
                  <div class="single-new-arrival">
                    <div class="single-new-arrival-bg">
                      <img src="assets/images/arrivals8.png" alt="new-arrivals images" />
                      <div class="single-new-arrival-bg-overlay"></div>
                      <div class="new-arrival-cart">
                        <p>
                          <span class="lnr lnr-cart"></span>
                          <a href="#">add <span>to </span> cart</a>
                        </p>
                        <p class="arrival-review pull-right">
                          <span class="lnr lnr-heart"></span>
                          <span class="lnr lnr-frame-expand"></span>
                        </p>
                      </div>
                    </div>
                    <h4><a href="#">wooden bed</a></h4>
                    <p class="arrival-product-price">$140.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="sofa-collection">
          <div class="owl-carousel owl-theme" id="collection-carousel">
            <div class="sofa-collection collectionbg1">
              <div class="container">
                <div class="sofa-collection-txt">
                  <h2>unlimited sofa collection</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <div class="sofa-collection-price">
                    <h4>strting from <span>$ 199</span></h4>
                  </div>
                  <button class="btn-cart welcome-add-cart sofa-collection-btn" onclick="window.location.href='#'">
                    view more
                  </button>
                </div>
              </div>
            </div>
            <div class="sofa-collection collectionbg2">
              <div class="container">
                <div class="sofa-collection-txt">
                  <h2>unlimited dainning table collection</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <div class="sofa-collection-price">
                    <h4>strting from <span>$ 299</span></h4>
                  </div>
                  <button class="btn-cart welcome-add-cart sofa-collection-btn" onclick="window.location.href='#'">
                    view more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="feature" class="feature">
          <div class="container">
            <div class="section-header">
              <h2>featured products</h2>
            </div>
            <div class="feature-content">
              <div class="row">
                <div class="col-sm-3">
                  <div class="single-feature">
                    <img src="assets/images/f1.jpg" alt="feature image" />
                    <div class="single-feature-txt text-center">
                      <p>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <span class="spacial-feature-icon"><i class="fa fa-star"></i></span>
                        <span class="feature-review">(45 review)</span>
                      </p>
                      <h3><a href="#">designed sofa</a></h3>
                      <h5>$160.00</h5>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="single-feature">
                    <img src="assets/images/f2.jpg" alt="feature image" />
                    <div class="single-feature-txt text-center">
                      <p>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <span class="spacial-feature-icon"><i class="fa fa-star"></i></span>
                        <span class="feature-review">(45 review)</span>
                      </p>
                      <h3><a href="#">dinning table </a></h3>
                      <h5>$200.00</h5>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="single-feature">
                    <img src="assets/images/f3.jpg" alt="feature image" />
                    <div class="single-feature-txt text-center">
                      <p>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <span class="spacial-feature-icon"><i class="fa fa-star"></i></span>
                        <span class="feature-review">(45 review)</span>
                      </p>
                      <h3><a href="#">chair and table</a></h3>
                      <h5>$100.00</h5>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="single-feature">
                    <img src="assets/images/f4.jpg" alt="feature image" />
                    <div class="single-feature-txt text-center">
                      <p>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <span class="spacial-feature-icon"><i class="fa fa-star"></i></span>
                        <span class="feature-review">(45 review)</span>
                      </p>
                      <h3><a href="#">modern arm chair</a></h3>
                      <h5>$299.00</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="blog" class="blog">
          <div class="container">
            <div class="section-header">
              <h2>latest blog</h2>
            </div>
            <div class="blog-content">
              <div class="row">
                <div class="col-sm-4">
                  <div class="single-blog">
                    <div class="single-blog-img">
                      <img src="assets/images/b1.jpg" alt="blog image" />
                      <div class="single-blog-img-overlay"></div>
                    </div>
                    <div class="single-blog-txt">
                      <h2><a href="#">Why Brands are Looking at Local Language</a></h2>
                      <h3>By <a href="#">Robert Norby</a> / 18th March 2018</h3>
                      <p>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt....
                      </p>
                    </div>
                  </div>

                </div>
                <div class="col-sm-4">
                  <div class="single-blog">
                    <div class="single-blog-img">
                      <img src="assets/images/b2.jpg" alt="blog image" />
                      <div class="single-blog-img-overlay"></div>
                    </div>
                    <div class="single-blog-txt">
                      <h2><a href="#">Why Brands are Looking at Local Language</a></h2>
                      <h3>By <a href="#">Robert Norby</a> / 18th March 2018</h3>
                      <p>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt....
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="single-blog">
                    <div class="single-blog-img">
                      <img src="assets/images/b3.jpg" alt="blog image" />
                      <div class="single-blog-img-overlay"></div>
                    </div>
                    <div class="single-blog-txt">
                      <h2><a href="#">Why Brands are Looking at Local Language</a></h2>
                      <h3>By <a href="#">Robert Norby</a> / 18th March 2018</h3>
                      <p>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt....
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        <section id="clients" class="clients">
          <div class="container">
            <div class="owl-carousel owl-theme" id="client">
              <div class="item">
                <a href="#">
                  <img src="assets/images/c1.png" alt="brand-image" />
                </a>
              </div>
              <div class="item">
                <a href="#">
                  <img src="assets/images/c2.png" alt="brand-image" />
                </a>
              </div>
              <div class="item">
                <a href="#">
                  <img src="assets/images/c3.png" alt="brand-image" />
                </a>
              </div>
              <div class="item">
                <a href="#">
                  <img src="assets/images/c4.png" alt="brand-image" />
                </a>
              </div>
              <div class="item">
                <a href="#">
                  <img src="assets/images/c5.png" alt="brand-image" />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="newsletter" class="newsletter">
          <div class="container">
            <div class="hm-footer-details">
              <div class="row">
                <div class=" col-md-3 col-sm-6 col-xs-12">
                  <div class="hm-footer-widget">
                    <div class="hm-foot-title">
                      <h4>information</h4>
                    </div>
                    <div class="hm-foot-menu">
                      <ul>
                        <li><a href="#">about us</a></li>
                        <li><a href="#">contact us</a></li>
                        <li><a href="#">news</a></li>
                        <li><a href="#">store</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class=" col-md-3 col-sm-6 col-xs-12">
                  <div class="hm-footer-widget">
                    <div class="hm-foot-title">
                      <h4>collections</h4>
                    </div>
                    <div class="hm-foot-menu">
                      <ul>
                        <li><a href="#">wooden chair</a></li>
                        <li><a href="#">royal cloth sofa</a></li>
                        <li><a href="#">accent chair</a></li>
                        <li><a href="#">bed</a></li>
                        <li><a href="#">hanging lamp</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class=" col-md-3 col-sm-6 col-xs-12">
                  <div class="hm-footer-widget">
                    <div class="hm-foot-title">
                      <h4>my accounts</h4>
                    </div>
                    <div class="hm-foot-menu">
                      <ul>
                        <li><a href="#">my account</a></li>
                        <li><a href="#">wishlist</a></li>
                        <li><a href="#">Community</a></li>
                        <li><a href="#">order history</a></li>
                        <li><a href="#">my cart</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class=" col-md-3 col-sm-6  col-xs-12">
                  <div class="hm-footer-widget">
                    <div class="hm-foot-title">
                      <h4>newsletter</h4>
                    </div>
                    <div class="hm-foot-para">
                      <p>
                        Subscribe  to get latest news,update and information.
                      </p>
                    </div>
                    <div class="hm-foot-email">
                      <div class="foot-email-box">
                        <input type="text" class="form-control" placeholder="Enter Email Here...." />
                      </div>
                      <div class="foot-email-subscribe">
                        <span><i class="fa fa-location-arrow"></i></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer id="footer" class="footer">
          <div class="container">
            <div class="hm-footer-copyright text-center">
              <div class="footer-social">
                <a href="#"><i class="fa fa-facebook"></i></a>
                <a href="#"><i class="fa fa-instagram"></i></a>
                <a href="#"><i class="fa fa-linkedin"></i></a>
                <a href="#"><i class="fa fa-pinterest"></i></a>
                <a href="#"><i class="fa fa-behance"></i></a>
              </div>
              <p>
                &copy;copyright. designed and developed by <a href="https://www.therichpost.com/">Jassa</a>
              </p>
            </div>
          </div>
          <div id="scroll-Top">
            <div class="return-to-top">
              <i class="fa fa-angle-up " id="scroll-top" data-toggle="tooltip" data-placement="top" title="" data-original-title="Back to Top" aria-hidden="true"></i>
            </div>

          </div>

        </footer>


      </header>
      </div>);


}
export default Home;
