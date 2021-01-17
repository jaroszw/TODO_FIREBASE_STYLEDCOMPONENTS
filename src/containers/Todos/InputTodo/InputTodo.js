import React from 'react';
import styled from 'styled-components';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import Headings from '../../../components/UI/Headings/Heading';
import Button from '../../../components/UI/Forms/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';
import Input from '../../../components/UI/Forms/Input/Input';
import Message from '../../../components/UI/Message/Message';
import { StyledForm } from '../../../hoc/layout/elements';

import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

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
  todo: Yup.string().required('The ToDo is required').min(4, 'To short'),
});

const InputTodo = ({
  edditTodo,
  edit,
  close,
  addToDo,
  error,
  loading,
  opened,
}) => {
  const loadingText = edit ? 'Edditing in progress' : 'adding your todo';

  return (
    <React.Fragment>
      <Modal opened={opened} close={close}>
        <Headings noMargin size="h1" color="white">
          {edit ? 'Edit your todo' : 'Add your new todo'}
        </Headings>
        <Headings bold size="h4" color="white">
          {edit ? 'Edit your todo and tap edit' : 'Add todo and press add'}
        </Headings>

        <Formik
          initialValues={{
            todo: edit ? edit.todo : '',
          }}
          validationSchema={TodoSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const res = edit
              ? await edditTodo(edit.id, values)
              : await addToDo(values);
            setSubmitting(false);

            if (res) {
              close();
            }
            resetForm();
          }}
        >
          {({ isSubmitting, isValid, resetForm }) => (
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
                  loading={loading ? loadingText : null}
                  contain
                  color="main"
                  type="submit"
                >
                  {edit ? 'Edit todo' : 'Add todo'}
                </Button>
                <Button
                  type="button"
                  color="red"
                  contain
                  onClick={() => {
                    close();
                    resetForm();
                  }}
                >
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

const mapStateToProps = ({ todos }, ownProps) => ({
  loading: todos.loading,
  error: todos.error,
});

const mapDispatchToProps = {
  addToDo: actions.addTodo,
  edditTodo: actions.edditTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTodo);
