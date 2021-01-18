import React, { useEffect } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import styled from "styled-components";

import { FormWrapper, StyledForm } from "../../../hoc/layout/elements";
import Input from "../../../components/UI/Forms/Input/Input";
import Button from "../../../components/UI/Forms/Button/Button";
import Headings from "../../../components/UI/Headings/Heading";
import Message from "../../../components/UI/Message/Message";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 6rem);
  background-color: var(--color-mainLight);
  padding: 5rem 0;
`;

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Your first name is required.")
    .min(3, "Too short.")
    .max(25, "Too long."),
  lastName: Yup.string()
    .required("Your last name is required.")
    .min(3, "Too short.")
    .max(25, "Too long."),
  email: Yup.string()
    .email("Invalid email.")
    .required("The email is required."),
  password: Yup.string()
    .required("The passoword is required.")
    .min(6, "your password is to short"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], `Password doesn't match`)
    .required("You need to confirm your password."),
});

const SignUp = ({ signUp, loading, error, cleanup }) => {
  useEffect(() => {
    cleanup();
  }, [cleanup]);

  return (
    <Wrapper>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await signUp(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <FormWrapper>
            <Headings noMargin size="h1" color="white">
              Sign up for an account
            </Headings>
            <Headings bold size="h4" color="white">
              Fill in your details to register your new account
            </Headings>
            <StyledForm>
              <Field
                type="text"
                name="firstName"
                placeholder="Your first name..."
                component={Input}
              />
              <Field
                type="text"
                name="lastName"
                placeholder="Your last name..."
                component={Input}
              />
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
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Re-type your password..."
                component={Input}
              />
              <Button
                disabled={!isValid || isSubmitting}
                loading={loading ? "In progress..." : null}
                type="submit"
              >
                Sign up
              </Button>
              <MessageWrapper>
                <Message error show={error}>
                  {error}
                </Message>
              </MessageWrapper>
            </StyledForm>
          </FormWrapper>
        )}
      </Formik>
    </Wrapper>
  );
};

const mapDispatchToProps = {
  signUp: actions.signUp,
  cleanup: actions.clean,
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
