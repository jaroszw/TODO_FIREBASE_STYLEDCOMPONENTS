import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import styled from "styled-components";
import * as actions from "../../../store/actions/authActions";

import { Formik, Field } from "formik";
import { FormWrapper, StyledForm } from "../../../hoc/layout/elements";

import Message from "../../../components/UI/Message/Message";
import Headings from "../../../components/UI/Headings/Heading";
import Input from "../../../components/UI/Forms/Input/Input";
import Button from "../../../components/UI/Forms/Button/Button";

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const ProfileSchema = Yup.object().shape({
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
  password: Yup.string().min(6, "The password is too short."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    `Pssword doesn't match`
  ),
});
//   confirmPassword: Yup.string().when("password", {
//     is: (password) => password.length > 0,
//     then: Yup.string()
//       .required("You need to confirm your password.")
//       .oneOf([Yup.ref("password"), null], `Password doesn't match`),
//   }),

const Profile = ({ firebase, editProfile, error, loading, cleanUp }) => {
  useEffect(() => {
    cleanUp();
  }, [cleanUp]);

  if (!firebase.profile.isLoaded) return null;

  return (
    <Formik
      initialValues={{
        firstName: firebase.profile.firstName,
        lastName: firebase.profile.lastName,
        email: firebase.auth.email,
        password: "",
        confirmPassword: "",
      }}
      validationSchema={ProfileSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await editProfile(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Headings noMargin size="h1" color="white">
            Edit your profile
          </Headings>
          <Headings bold size="h4" color="white">
            Fill in your details to edit your profile data
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
              loading={loading ? "Edditing data..." : null}
              type="submit"
            >
              Edit
            </Button>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
            <MessageWrapper>
              <Message success show={error === false}>
                Profile was updated
              </Message>
            </MessageWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ auth, firebase }) => ({
  firebase,
  error: auth.profileEdit.error,
  loading: auth.profileEdit.loading,
});

const mapDispatchToProps = {
  editProfile: actions.editProfile,
  cleanUp: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
