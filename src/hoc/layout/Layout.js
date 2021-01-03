import React from 'react';
import Navbar from '../../components/Navigation/Navbar/Navbar';

import styled from 'styled-components';

const MainWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 6rem);
  margin-top: 6rem;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      <MainWrapper>{children}</MainWrapper>
    </>
  );
};

export default Layout;
