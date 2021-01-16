import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  padding: 2rem 3rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  background-color: var(--color-mainLighter);
  box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
  color: var(--color-white);
`;

const Todo = ({ todo }) => {
  return <Wrapper>{todo.todo}</Wrapper>;
};

export default Todo;
