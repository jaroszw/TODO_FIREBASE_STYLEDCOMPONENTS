import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: var(--color-mainDark);
  justify-content: center;
  align-items: center;
  color: var(--color-white);
  font-size: 2rem;
`;

const Home = () => {
  return <Wrapper>This is home Container</Wrapper>;
};

export default Home;
