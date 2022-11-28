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
    residence: ['ariana', 'soukra'],
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
    company_residence: ['ariana', 'soukra'], 
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
  const items = [ {title: 'Personal Info'} , { title: 'Company Info' }];
  return (
    <>
      <Steps current={current} items={items} /> 
      <div className="steps-content">
        {items[current].title === 'Personal Info' ?
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