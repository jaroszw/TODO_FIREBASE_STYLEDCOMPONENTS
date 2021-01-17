import React from 'react';
import styled from 'styled-components';

import Headings from '../../components/UI/Headings/Heading';
import { Container } from '../../hoc/layout/elements';
import AddTodo from './AddTodos/AddTodo';
import Todo from './Todo/Todo';
import Loader from '../../components/UI/Loader/Loader';

import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

const Wrapper = styled.div`
  width: 100%;
  align-self: flex-start;
  height: 100%;
  min-height: calc(100vh - 6rem);
  background-color: var(--color-mainLight);
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 4rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  align-items: center;
`;

const Todos = ({ todos, requesting, requested, userId }) => {
  let respons;

  if (!todos) {
    respons = (
      <ContentWrapper>
        <Loader isWhite />;
      </ContentWrapper>
    );
  } else if (
    (!todos[userId] && requested[`todos/${userId}`]) ||
    todos[userId].todos.length === 0
  ) {
    respons = (
      <Headings color="white" bold size="h1">
        No todos to provide
      </Headings>
    );
  } else {
    respons = (
      <ContentWrapper>
        {todos[userId].todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ContentWrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        <InnerWrapper>
          <Headings noMargin size="h1" color="white">
            My TODO's
          </Headings>
          <Headings size="h3" color="white" bold></Headings>
          <AddTodo />
          {respons}
        </InnerWrapper>
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  todos: firestore.data.todos,
  requesting: firestore.status.requesting,
  requested: firestore.status.requested,
});

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [`todos/${props.userId}`])
)(Todos);
