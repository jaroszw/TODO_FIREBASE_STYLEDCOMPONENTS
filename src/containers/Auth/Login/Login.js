import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { FormWrapper, StyledForm } from '../../../hoc/layout/elements';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Headings from '../../../components/UI/Headings/Heading';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('The email is required'),
  password: Yup.string().required('The password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

const onSubmit = (values, { setSubmiting }) => {
  console.log(values);
};

const Login = () => {
  return (
    <FormWrapper>
      <Headings size="h1" color="white" noMargin>
        LogIn into your account
      </Headings>

      <Headings size="h4" color="white" bold>
        Fill in your details to login into your account
      </Headings>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmiting, isValid }) => (
          <StyledForm>
            <Field
              type="email"
              name="email"
              placeholder="Your email..."
              component={Input}
            />
            <Field
              type="password"
              name="password"
              placeholder="Your password..."
              component={Input}
            />
            <Button disabled={!isValid} type="submit">
              Login
            </Button>
          </StyledForm>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default Login;
