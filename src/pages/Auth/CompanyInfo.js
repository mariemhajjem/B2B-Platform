import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input, FormControl, FormHelperText } from '@material-ui/core';
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
  matricule_fiscale: yup.string().required('matricule is required'),
  company_name: yup.string().required('company name is required'),
  company_email: yup.string().email('Invalid email').required('Email is required'),
  company_phoneNumber: yup.string().required('phone Number is required'),
  company_address: yup.string().required('company address is required'),

});

export const CompanyInfo = ({
  formData,
  setFormData,
  nextStep,
  prevStep
}) => {
  const classes = useStyles();

  return (
    <>

      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          nextStep()

        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched ,setFieldValue }) => (
          <Form className={classes.form}>

            <Field
              name='matricule_fiscale'
              label='matricule_fiscale *'
              margin='normal' fullWidth variant="outlined"
              as={TextField}
              error={!!touched.matricule_fiscale && !!errors.matricule_fiscale}
              helperText={touched.matricule_fiscale && errors.matricule_fiscale}
            />
            <Field
              name='company_name'
              label='company_name *'
              margin='normal' fullWidth variant="outlined"
              as={TextField}
              error={!!touched.company_name && !!errors.company_name}
              helperText={touched.company_name && errors.company_name}
            />
            <Field
              type='email'
              name='company_email'
              label='company_email *'
              margin='normal' fullWidth variant="outlined"
              as={TextField}
              error={!!touched.company_email && !!errors.company_email}
              helperText={touched.company_email && errors.company_email}
            />
            <Field
              name='company_phoneNumber'
              label='company_phoneNumber *'
              margin='normal' fullWidth variant="outlined"
              as={TextField}
              error={!!touched.company_phoneNumber && !!errors.company_phoneNumber}
              helperText={touched.company_phoneNumber && errors.company_phoneNumber}
            /> 
            <Field
              name='company_address'
              label='company_address*'
              margin='normal' fullWidth variant="outlined"
              as={TextField}
              error={!!touched.company_address && !!errors.company_address}
              helperText={touched.company_address && errors.company_address}

            />
            <FormControl>

              <Input
                name="logo"
                aria-describedby="my-helper-text"
                type="file"
                onChange={(event) => {
                  setFieldValue("logo", event.currentTarget.files[0]);
                }}
                required
                accept="image/*"
              />
              <FormHelperText id="my-helper-text">Upload logo</FormHelperText>
              
            </FormControl>


            <div>
              <Button
                color="primary"
                onClick={prevStep}
                className={classes.button+' '+"BtnColorBlue"}
              >
                Back
              </Button>
              <Button variant="contained" className={classes.button+' '+"BtnColorGreen"}  type="submit">
                Next
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

CompanyInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};
