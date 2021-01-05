import React, { useState } from 'react';
import styled from 'styled-components';

//components
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Hamburger from './Hamburger/Hamburger';

const FixedWrapper = styled.div`
  position: fixed;
  background-color: var(--color-mainDark);
  padding: 0rem 2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  display: none;
  z-index: 10;

  @media ${(props) => props.theme.mediaQueries.smallest} {
    display: flex;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.div`
  width: 100%;
  background-color: var(--color-mainDark);
  height: 100vh;
  visibility: ${(props) => (props.opened ? 'visible' : 'hidden')};
  transform: translateY(${(props) => (props.opened ? '0%' : '-100%')});
  position: fixed;
  margin-top: 6rem;
  top: 0;
  left: 0;
  transition: all 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;

  @media ${(props) => props.theme.mediaQueries.smallest} {
    display: flex;
  }
`;

export const SideDrawer = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <FixedWrapper>
        <Wrapper>
          <Logo />
          <Hamburger clicked={() => setIsOpened(!isOpened)} opened={isOpened} />
        </Wrapper>
      </FixedWrapper>
      <Menu opened={isOpened}>
        <NavItems mobile clicked={() => setIsOpened(false)} />
      </Menu>
    </>
  );
};
export default SideDrawer;
