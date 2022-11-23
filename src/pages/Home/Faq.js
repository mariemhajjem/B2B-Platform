import { Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import {
  BarChartOutlined,
  QuestionCircleOutlined,
  DollarOutlined
} from "@ant-design/icons";

import "./Faq.css";
const style = {
  background: "white",
  padding: "1%",
  margin: "3%",
};

function Faq() {
  const { t } = useTranslation();
  return (
    <div id="Faq">
      <br />
      <h1>{t("Questions fréquentes")}</h1>
      <br />

      <Row gutter={{ xs: 8, sm: 8, md: 18, lg: 32 }} style={{flexWrap: "wrap"}}>
        <Col className="gutter-row" span={8}>
          <div style={style} className="textStyle">
            <BarChartOutlined className="iconStyle" />
            <br />
            <br />
            <h3>
              {t(
                "Quels sont les grands principes de la stratégie de vente ?"
              )}
            </h3>
            <p>
              <p>{t("Nous avons fixé le principes suivant :")}</p>
              {t(
                "Un accès équitable gratuit, sûr et de qualité approuvés par les données en temps opportun"
              )} 
            </p>
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div style={style} className="textStyle">
            <QuestionCircleOutlined className="iconStyle" />
            <br />
            <br />
            <h3>{t("Comment s’enregistrer pour la vaccination Covid-19 ?")}</h3>
            <p>{t("Website : www.tradingoptimum.tn")} </p>
            <p>{t("SMS : 23255036")}</p> <p> {t("Appel : 23255036")}</p>
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div style={style} className="textStyle">
            <DollarOutlined className="iconStyle" />
            <br />
            <br />
            <h3>
              {t("L'inscription sera-t-elle gratuite ?")}
            </h3>
            <p>{t("Oui.")} </p>
            <p>
              {t(
                "L'inscription sera gratuite pour tous en Tunisie"
              )}
            </p>
          </div>
        </Col>

      </Row>


    </div>
  );
}
export default Faq;
