import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import * as yup from 'yup';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required').max(20),
  lastName: yup.string().required('Last Name is required').max(20),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup.string().required('phone Number is required')
});

export const PersonalInfo = ({ formData, setFormData, nextStep }) => {
  const classes = useStyles();
  return (
    <> 
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          nextStep();
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className={classes.form}>
            <Field
              name='firstName'
              label='First Name *'
              margin='normal' fullWidth variant="outlined"
              as={TextField}
              error={!!touched.firstName && !!errors.firstName}
              helperText={touched.firstName && errors.firstName}
            />

            <Field
              name='lastName'
              label='Last Name *'
              margin='normal' fullWidth variant="outlined"
              as={TextField}
              error={!!touched.lastName && !!errors.lastName}
              helperText={touched.lastName && errors.lastName}
            />
            <Field
              type='email'
              name='email'
              label='Email *'
              margin='normal' fullWidth variant="outlined"
              as={TextField}
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
            <Field
              name='phoneNumber'
              label='Phone Number *'
              margin='normal' fullWidth variant="outlined"
              as={TextField}
              error={!!touched.phoneNumber && !!errors.phoneNumber}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />

            <Field
              name='address'
              label='Address'
              margin='normal' fullWidth variant="outlined"
              as={TextField}

            />

           
           
             
              <Button variant="contained" className="BtnColorGreen" type='submit'>
                Next
              </Button>
          
        
          </Form>
        )}
      </Formik>
    </>
  );
};

PersonalInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};
