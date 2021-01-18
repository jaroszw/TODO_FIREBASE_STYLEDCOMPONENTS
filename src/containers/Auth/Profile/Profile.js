import React, { useEffect, useState } from "react";
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
import Modal from "../../../components/UI/Modal/Modal";

const Wrapper = styled.div`
  width: 100%;
  align-self: flex-start;
  height: 100%;
  min-height: calc(100vh - 6rem);
  background-color: var(--color-mainLight);
  padding: 5rem 0;
`;

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const DeleteWrapper = styled.div`
  cursor: pointer;
  color: var(--color-errorRed);
  font-size: 1.3rem;
  transition: all 0.2s;
  margin-top: 2rem;
  font-weight: 700;

  &:hover {
    transform: translateY(-3px);
  }
  &:active {
    transform: translateY(2px);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 30rem;
  justify-content: space-around;
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

const Profile = ({
  firebase,
  editProfile,
  error,
  loading,
  cleanUp,
  deleteUser,
  loadingDelete,
  errorDelete,
}) => {
  useEffect(() => {
    cleanUp();
  }, [cleanUp]);

  const [modalOpened, setModalOpened] = useState(false);

  if (!firebase.profile.isLoaded) return null;

  return (
    <Wrapper>
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
              <DeleteWrapper
                style={{ zIndex: "80" }}
                onClick={() => setModalOpened(true)}
              >
                Delete my account
              </DeleteWrapper>
            </StyledForm>
          </FormWrapper>
        )}
      </Formik>
      <Modal opened={modalOpened} close={() => setModalOpened(false)}>
        <Headings noMargin size="h1" color="white">
          Delete your account
        </Headings>
        <Headings bold size="h4" color="white">
          Do you really want to delete your account
        </Headings>
        <ButtonWrapper>
          <Button
            disabled={loadingDelete}
            loading={loadingDelete ? "Deleting..." : null}
            contain
            color="red"
            onClick={() => deleteUser()}
          >
            Delete
          </Button>
          <Button color="main" contain onClick={() => setModalOpened(false)}>
            Cancel
          </Button>
        </ButtonWrapper>
        <MessageWrapper>
          <Message error show={errorDelete}>
            {errorDelete}
          </Message>
        </MessageWrapper>
      </Modal>
    </Wrapper>
  );
};

const mapStateToProps = ({ auth, firebase }) => ({
  firebase,
  error: auth.profileEdit.error,
  loading: auth.profileEdit.loading,
  loadingDelete: auth.deleteUser.loading,
  errorDelete: auth.deleteUser.error,
});

const mapDispatchToProps = {
  editProfile: actions.editProfile,
  cleanUp: actions.clean,
  deleteUser: actions.deleteProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
