import React from 'react';
import { Card, Divider, Space, Table } from 'antd';

import { Button, Row } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link } from 'react-router-dom';
// import "./styles.css"
const columns = [
  {
    title: 'Produit',
    dataIndex: 'Produit',
    key: 'Produit',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'quantité',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Prix',
    dataIndex: 'prix',
    key: 'prix',
  },
  {
    title: 'Supprimer',
    key: 'supprimer',
    render: (_, record) => (
      <Button danger>Supprimer</Button>
    ),
  },
];
const data = [
  {
    key: '1',
    Produit: 'John Brown',
    quantity: 32,
    prix: 32,
  },
  {
    key: '1',
    Produit: 'John Brown',
    quantity: 32,
    prix: 32,
  },
  {
    key: '1',
    Produit: 'John Brown',
    quantity: 32,
    prix: 32,
  },
];
export default function DemandeDevis() {

  const downloadPdf = (e) => {
    e.preventDefault();
    console.log(e)
    html2canvas(document.querySelector("#capture")).then((canvas) => {
      // if you want see your screenshot in body.
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("demande-devis.pdf");
    });
  };
  return (<>
    <Row style={{ justifyContent: "flex-end", margin: "3em 4em" }}>
      <Button
        className="but"
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
        onClick={downloadPdf}
      >
        Télécharger
      </Button></Row>
    <Space id="capture" wrap direction="vertical" size="middle" style={{ display: "flex", justifyContent: "center", margin: "0 10em" }}>
      <h1>Demande de devis</h1>
      <h2>{"Date : " + new Date().toLocaleDateString()}</h2>
      <div style={{display: "flex", flexWrap: "wrap", justifyContent:"space-between"}}>
        <Table pagination={false} columns={columns} dataSource={data} style={{ width: "80%"}}/>
        <Card style={{ height: "35%" }}> 
          <Space direction="vertical">
            <Button type="primary">Envoyer devis</Button>
            <Button>Discuter maintenant</Button>
          </Space>
        </Card>
      </div>

    </Space>
    <h3 style={{ padding: " 0 10em"}}> <Link to='/'>{`< Continuer mes achats`}</Link></h3>
  </>);
}
