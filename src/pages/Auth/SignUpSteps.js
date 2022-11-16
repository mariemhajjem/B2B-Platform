import React, { useState } from 'react';
import { Button, message, Steps } from 'antd';
import { Link } from 'react-router-dom';
import { PersonalInfo } from './PersonalInfo';
import { CompanyInfo } from './CompanyInfo';
import "./Signup.css";

const { Step } = Steps;
const steps = [
  {
    title: 'Personal Info',
    content: 'First-content',
  },
  {
    title: 'Company Info',
    content: 'Second-content',
  },
];

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
  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">
        {steps[current].content === 'First-content' ?
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