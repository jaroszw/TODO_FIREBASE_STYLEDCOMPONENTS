import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Headings from "../../../components/UI/Headings/Heading";
import Button from "../../../components/UI/Forms/Button/Button";
import Modal from "../../../components/UI/Modal/Modal";
import Input from "../../../components/UI/Forms/Input/Input";
import Message from "../../../components/UI/Message/Message";
import { StyledForm } from "../../../hoc/layout/elements";

import * as actions from "../../../store/actions";
import { connect } from "react-redux";

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 30rem;
  justify-content: space-around;
`;

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const TodoSchema = Yup.object().shape({
  todo: Yup.string().required("The ToDo is required").min(4, "To short"),
});

const AddTodo = ({ addToDo, error, loading }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <React.Fragment>
      <Button contain color="main" onClick={() => setIsOpened(true)}>
        Add ToDo
      </Button>
      <Modal opened={isOpened} close={() => setIsOpened(false)}>
        <Headings noMargin size="h1" color="white">
          Add your new ToDo
        </Headings>
        <Headings bold size="h4" color="white">
          Type your todo and press add
        </Headings>

        <Formik
          initialValues={{
            todo: "",
          }}
          validationSchema={TodoSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const res = await addToDo(values);
            console.log(res);
            if (res) {
              setIsOpened(false);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <StyledForm>
              <Field
                type="text"
                name="todo"
                placeholder="Type your todo"
                component={Input}
              />
              <MessageWrapper>
                <Message error show={false}>
                  error
                </Message>
              </MessageWrapper>
              <ButtonWrapper>
                <Button
                  disabled={!isValid || isSubmitting}
                  loading={loading ? "Adding..." : null}
                  contain
                  color="main"
                  type="submit"
                >
                  Add
                </Button>
                <Button color="red" contain onClick={() => setIsOpened(false)}>
                  Cancel
                </Button>
              </ButtonWrapper>
              <MessageWrapper>
                <Message error show={error}>
                  {error}
                </Message>
              </MessageWrapper>
              <MessageWrapper>
                <Message success show={error === false}>
                  Todo added
                </Message>
              </MessageWrapper>
            </StyledForm>
          )}
        </Formik>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = ({ todos }) => ({
  loading: todos.loading,
  error: todos.error,
});

const mapDispatchToProps = {
  addToDo: actions.addTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
