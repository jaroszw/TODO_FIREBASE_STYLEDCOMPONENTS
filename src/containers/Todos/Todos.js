import React, { useState } from "react";
import styled from "styled-components";

import Headings from "../../components/UI/Headings/Heading";
import { Container } from "../../hoc/layout/elements";
import AddTodo from "./AddTodos/AddTodo";

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

const Todos = () => {
  return (
    <Wrapper>
      <Container>
        <InnerWrapper>
          <Headings noMargin size="h1" color="white">
            My TODO's
          </Headings>
          <Headings size="h3" color="white" bold>
            All you have to do for now
          </Headings>
          <AddTodo />
        </InnerWrapper>
      </Container>
    </Wrapper>
  );
};

export default Todos;
