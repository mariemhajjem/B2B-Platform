import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/reducers/cartSlice";
import imgToString from "../../utils/imgToString";

const { Meta } = Card;
export default function Produit({ produit }) {
  const dispatch = useDispatch();
  
  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + " ...";
    }
    return str;
  };

  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<Link to={`/details/${produit?._id}`}><img alt="example" src={imgToString(produit?.product_picture)} style={{
        height: 250, width: 240
      }} /></Link>}
      actions={[
        <div onClick={() => dispatch(addToCart({...produit, quantity: 1}))}>
          <ShoppingCartOutlined /></div>,
        <HeartOutlined />,
      ]}
    >
      <Meta title={<Link to={`/details/${produit?._id}`}>{produit?.product_label}</Link>} description={<Link to={`/details/${produit?._id}`}>{excerpt(produit?.product_description)}</Link>} />
      <Link to={`/details/${produit?._id}`}><h4>{produit?.product_price} DT</h4></Link>
    </Card>
  );

}