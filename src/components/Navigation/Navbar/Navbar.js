import React from 'react';
import styled from 'styled-components';

import Container from '../../../hoc/layout/elements/Container';

//components
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';

const FixedWrapper = styled.div`
  position: fixed;
  background-color: var(--color-mainDark);
  padding: 0rem 2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
`;

export const Navbar = () => {
  return (
    <FixedWrapper>
      <Container>
        <Wrapper>
          <Logo />
          <NavItems />
        </Wrapper>
      </Container>
    </FixedWrapper>
  );
};
export default Navbar;
