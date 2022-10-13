import React, { useState } from "react";
import { Menu, Carousel, Image, Layout, Card, Row, Col, Avatar } from "antd"; 
import datawarehouse from "../../assets/images/datawarehouse.jpg"
import { Button } from "antd/lib/radio";

import profilavatar from "../../assets/images/face-1.jpg";
import convesionImg from "../../assets/images/face-3.jpg";
import convesionImg2 from "../../assets/images/face-4.jpg";
import convesionImg3 from "../../assets/images/face-5.jpeg"; 

import project1 from "../../assets/images/home-decor-1.jpeg";
import project2 from "../../assets/images/home-decor-2.jpeg";
import project3 from "../../assets/images/home-decor-3.jpeg";

const { Footer, Content } = Layout;


const project = [
  {
    img: project1,
    titlesub: "Project #1",
    title: "Modern",
    disciption:
      "As Uber works through a huge amount of internal management turmoil.",
  },
  {
    img: project2,
    titlesub: "Project #2",
    title: "Scandinavian",
    disciption:
      "Music is something that every person has his or her own specific opinion about.",
  },
  {
    img: project3,
    titlesub: "Project #3",
    title: "Minimalist",
    disciption:
      "Different people have different taste, and various types of music, Zimbali Resort",
  },
  {
    img: project2,
    titlesub: "Project #2",
    title: "Scandinavian",
    disciption:
      "Music is something that every person has his or her own specific opinion about.",
  },
  {
    img: project2,
    titlesub: "Project #2",
    title: "Scandinavian",
    disciption:
      "Music is something that every person has his or her own specific opinion about.",
  },
  {
    img: project2,
    titlesub: "Project #2",
    title: "Scandinavian",
    disciption:
      "Music is something that every person has his or her own specific opinion about.",
  },
];

function Home() {
  const [windowSize, setWindowSize] = useState(window.innerHeight);
  const [windowwidth, setWindowWidth] = useState(window.innerWidth);
 

  const contentStyle = {
    height: windowSize* 0.8,
    width: windowwidth,
    color: "black",
    lineHeight: "160px",
    innerHeight: "100%",
    background: "white",
  };

  return (
    
      <Content>
      <Carousel autoplay>
        <div>
          <Image src={datawarehouse} style={contentStyle} />
        </div>
        <div>
          <Image src={datawarehouse} style={contentStyle} />
        </div>
      </Carousel> 
      
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">Produits</h6>
            <p>Architects design houses</p>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {project.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={p.img} />}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.titile}</h5>
                <p>{p.disciption}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button">VIEW PROJECT</Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))} 
        </Row>
      </Card>
      <Footer>
      <Menu mode="horizontal"> 
              <Menu.Item>About Us</Menu.Item>
              <Menu.Item>Teams</Menu.Item>
              <Menu.Item>Products</Menu.Item> 
            </Menu>
            <Menu mode="horizontal" className="menu-nav-social">
              <Menu.Item>
                 
              </Menu.Item> 
              <Menu.Item> 
              </Menu.Item> 
              <Menu.Item> 
              </Menu.Item>
            </Menu>
            <p className="copyright">
              {" "}
              Copyright © 2022 by <a href="#pablo"></a>me.{" "}
            </p>
      </Footer>
      </Content> 
  );
}
export default Home;
