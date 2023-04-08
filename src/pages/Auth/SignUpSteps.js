import React, { useState } from 'react';
import { Steps } from 'antd';
import { PersonalInfo } from './PersonalInfo';
import { CompanyInfo } from './CompanyInfo';
import "./Signup.css"; 

export default function SignUpSteps({role}) {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    residence: '',
    address: '', 
    role,
    gender: '',
    password: '',
    confirmPassword: '',
    matricule_fiscale: '',
    company_name: '',
    company_phoneNumber: '',
    company_email: '', 
    logo: '',
    company_residence: '', 
    company_address: '',
  });

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const onChange = (values) => {
    setFormData(values)
  };
  const items = [ {title: 'Informations générales'} , { title: 'Informations professionnelles' }];
  return (
    <>
      <Steps current={current} items={items} /> 
      <div className="steps-content">
        {items[current].title === 'Informations générales' ?
          <PersonalInfo
            formData={formData}
            setFormData={onChange}
            next={next}
          /> : <CompanyInfo
            formData={formData}
            setFormData={onChange}
            prev={prev}
          />}
      </div>
      
    </>
  );
}