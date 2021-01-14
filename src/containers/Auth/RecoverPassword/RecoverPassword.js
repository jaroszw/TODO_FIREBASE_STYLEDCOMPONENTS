import React, { useEffect } from "react";
import { FormWrapper, StyledForm } from "../../../hoc/layout/elements";
import Headings from "../../../components/UI/Headings/Heading";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import * as actions from "../../../store/actions/authActions";

import { connect } from "react-redux";

import Input from "../../../components/UI/Forms/Input/Input";
import Button from "../../../components/UI/Forms/Button/Button";
import Message from "../../../components/UI/Message/Message";

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const recoverSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("The email is required"),
});

const RecoverPassword = ({ clean, error, loading, recoverPassword }) => {
  useEffect(() => {
    clean();
  }, [clean]);

  console.log(error);

  return (
    <FormWrapper>
      <Headings noMargin size="h1" color="white">
        Recover your password
      </Headings>
      <Headings size="h4" bold color="white">
        Type in your email to recover your password
      </Headings>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={recoverSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await recoverPassword(values);
          setSubmitting(false);
        }}
      >
        {({ isValid, isSubmitting }) => {
          return (
            <StyledForm>
              <Field
                type="email"
                name="email"
                placeholder="Your email..."
                component={Input}
              />
              <Button
                disabled={!isValid || isSubmitting}
                loading={loading ? "Sending to your email..." : null}
                type="submit"
              >
                Reset
              </Button>
              <MessageWrapper>
                <Message error show={error}>
                  {error}
                </Message>
              </MessageWrapper>
              <MessageWrapper>
                <Message success show={error === false}>
                  Password sent successfully!
                </Message>
              </MessageWrapper>
            </StyledForm>
          );
        }}
      </Formik>
    </FormWrapper>
  );
};

const mapStateToProps = ({ auth }) => ({
  error: auth.recoverPassword.error,
  loading: auth.recoverPassword.loading,
});

const mapDispatchToProps = {
  recoverPassword: actions.recoverPassword,
  clean: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
