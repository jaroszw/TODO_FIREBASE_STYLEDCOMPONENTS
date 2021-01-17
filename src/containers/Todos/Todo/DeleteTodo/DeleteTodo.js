import React from 'react';
import Modal from '../../../../components/UI/Modal/Modal';
import Button from '../../../../components/UI/Forms/Button/Button';
import styled from 'styled-components';
import Headings from '../../../../components/UI/Headings/Heading';
import Message from '../../../../components/UI/Message/Message';

import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';

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

const TodoWrapper = styled.div`
  margin: 1rem 0;
  font-size: 1.4rem;
  color: var(--color-white);
  text-align: center;
`;

const DeleteTodo = ({
  deleting,
  todo,
  close,
  deleteTodo,
  deleteLoading,
  deleteError,
}) => {
  return (
    <Modal opened={deleting} close={close}>
      <Headings noMargin size="h1" color="white">
        Deleting todo...
      </Headings>
      <Headings bold size="h4" color="white">
        Add your sure you want to delete:
      </Headings>
      <TodoWrapper>{todo.todo}</TodoWrapper>
      <ButtonWrapper>
        <Button contain color="main" onClick={() => close()}>
          Cancel
        </Button>
        <Button
          onClick={() => deleteTodo(todo.id)}
          color="red"
          disabled={deleteLoading}
          loading={deleteLoading ? 'Deleting...' : null}
        >
          Delete
        </Button>
      </ButtonWrapper>
      <MessageWrapper>
        <Message error show={deleteError}>
          {deleteError}
        </Message>
      </MessageWrapper>
    </Modal>
  );
};

const mapStateToProps = ({ todos }) => ({
  deleteError: todos.deleteTodos.error,
  deleteLoading: todos.deleteTodos.loading,
});

const mapDispatchToProps = {
  deleteTodo: actions.deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTodo);
