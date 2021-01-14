import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoWrapper = styled.div`
  color: var(--color-white);
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem;
`;

const StyledLink = styled(Link)`
  color: white;
  cursor: pointer;
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <StyledLink to="/">Productivity</StyledLink>
    </LogoWrapper>
  );
};

export default Logo;
