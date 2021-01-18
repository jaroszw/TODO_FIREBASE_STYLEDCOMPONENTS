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

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("The email is required"),
  password: Yup.string().required("The password is required"),
});

const Login = ({ error, loading, LogIn, cleanup }) => {
  useEffect(() => {
    cleanup();
  }, [cleanup]);

  return (
    <Wrapper>
      <FormWrapper>
        <Headings size="h1" color="white" noMargin>
          LogIn into your account
        </Headings>

        <Headings size="h4" color="white" bold>
          Fill in your details to login into your account
        </Headings>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await LogIn(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid }) => (
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
              <Button
                disabled={!isValid || isSubmitting}
                loading={loading ? "In progress..." : null}
                type="submit"
              >
                Log In
              </Button>
              <MessageWrapper>
                <Message error show={error}>
                  {error}
                </Message>
              </MessageWrapper>
            </StyledForm>
          )}
        </Formik>
      </FormWrapper>
    </Wrapper>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
});

const mapDispatchToProps = {
  LogIn: actions.signIn,
  cleanup: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
