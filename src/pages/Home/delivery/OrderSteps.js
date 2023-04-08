import React, { useEffect, useState } from 'react';
import { Modal, Steps } from 'antd';
import { OrderPersonalInfo } from './OrderPersonalInfo';
import { PaymentInfo } from './PaymentInfo';
// import "../../Auth/Signup.css"; 

export default function OrderSteps({visible, setOrder, formData, onChange}) {

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  
  const items = [ {title: 'Infos de livraison'} , { title: 'Infos de paiement' }];
  return (
    <Modal
      title="Passer commande"
      open={visible}
      footer={null}
      onCancel={setOrder} >
      <Steps current={current} items={items} /> 
      <div className="steps-content">
        {items[current].title === 'Infos de livraison' ?
          <OrderPersonalInfo
            formData={formData}
            setFormData={onChange}
            next={next}
          /> : <PaymentInfo
            formData={formData}
            setFormData={onChange}
            setOrder={setOrder}
            prev={prev}
          />}
      </div>
    </Modal> 
  );
}